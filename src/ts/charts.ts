import { ExtendedGoogleMapsMarker } from './models/extendedGoogleMapsMarker.model';
import { FormFilters } from './models/formFilters.model';
import * as Highcharts from 'highcharts';
import { Definition } from './models';

/**
 * @author Georges.L <contact@geolim4.com>
 * @licence GPL-2.0
 */
export class Charts {
  public static buildChartPerCause(markers: ExtendedGoogleMapsMarker[], filters: FormFilters, definitions: Definition[], year: string): void  {
    this.buildBarChartPerCriteria(markers, filters, definitions, 'cause', year);
    this.buildPieChartPerCriteria(markers, filters, definitions, 'cause', year);
  }

  public static buildChartPerHouse(markers: ExtendedGoogleMapsMarker[], filters: FormFilters, definitions: Definition[], year: string): void {
    this.buildBarChartPerCriteria(markers, filters, definitions, 'house', year);
    this.buildPieChartPerCriteria(markers, filters, definitions, 'house', year);
  }

  protected static buildBarChartPerCriteria(markers: ExtendedGoogleMapsMarker[], filters: FormFilters, definitions: Definition[], criteria: string, year: string): void {
    const series = [];

    for (const criteriaFilter of filters[criteria]) {
      const data = Array(12).fill(0);
      for (const marker of markers) {
        if (marker.death[criteria] === criteriaFilter.value) {
          data[parseInt(marker.death.month, 0) - 1] += marker.death.count;
          for (const peer of marker.death.peers) {
            data[parseInt(marker.death.month, 0) - 1] += peer.count;
          }
        }
      }
      series.push({ data , name: criteriaFilter.label, color: this.getFilterCriteriaColor(criteria, criteriaFilter.value, filters) });
    }

    Highcharts.chart(`chart-container-bar-${criteria}`, {
      series,
      chart: {
        type: 'column',
      },
      plotOptions: {
        column: {
          borderWidth: 0,
          pointPadding: 0.2,
        },
      },
      subtitle: {
        text: 'Données contextualisées par les filtres appliqués',
      },
      title: {
        text: `Décès mensuels par ${definitions[criteria]['#name']} sur l'année ${year}`,
      },
      tooltip: {
        backgroundColor: 'rgba(226,226,226,0.98)',
        footerFormat: '</table>',
        headerFormat: '<div style="font-size:15px; font-weight: bold;margin: 0 0 10px 0">Mois: {point.key}</div><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}:  </td>' +
          '<td style="padding: 2px 10px 2px 20px"><b>{point.y} décès</b></td></tr>',
        shared: true,
        useHTML: true,
      },
      xAxis: {
        categories: filters.month.map((month) => month.label),
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Décès',
        },
      },
    });
  }

  protected static buildPieChartPerCriteria(markers: ExtendedGoogleMapsMarker[], filters: FormFilters, definitions: Definition[], criteria: string, year: string): void {
    const seriesData = [];

    for (const criteriaFilter of filters[criteria]) {
      let counter = 0;
      for (const marker of markers) {
        if (marker.death[criteria] === criteriaFilter.value) {
          counter += marker.death.count;
          for (const peer of marker.death.peers) {
            counter += peer.count;
          }
        }
      }
      if (counter) {
        seriesData.push([counter, criteriaFilter.label, this.getFilterCriteriaColor(criteria, criteriaFilter.value, filters)]);
      }
    }
    Highcharts.chart(`chart-container-pie-${criteria}`, {
      exporting: {
        enabled: false,
      },
      series: [{
        allowPointSelect: true,
        data: seriesData,
        keys: ['y', 'name', 'color'],
        name: 'décès',
        showInLegend: false,
        type: 'pie',
      }],
      subtitle: {
        text: 'Données contextualisées par les filtres appliqués',
      },
      title: {
        text: `Décès totaux par ${definitions[criteria]['#name']} sur l'année ${year}`,
      },
      tooltip: {
        backgroundColor: 'rgba(226,226,226,0.98)',
        headerFormat: '',
        pointFormat: '<div><strong>{point.name}:</strong></div> <div>{point.y} {series.name} <em>({point.percentage:.1f}%)</em></div>',
      },
      xAxis: {
        categories: [],
      },
    });
  }

  protected static getFilterCriteriaColor(criteria: string, value: string, filters: FormFilters): string {
    for (const filterVal of filters[criteria]) {
      if (filterVal.value === value) {
        return filterVal.color;
      }
    }
    return '#000000';
  }
}