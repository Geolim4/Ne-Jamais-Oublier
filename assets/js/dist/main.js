!function(){var e={},t=[null];function n(n,o,r){e[n]={dependencies:o,factory:r},t[0]=n}n("require",["exports"],function(e){Object.defineProperty(e,"__cjsModule",{value:!0}),Object.defineProperty(e,"default",{value:function(e){return i(e)}})});var o=this&&this.__assign||function(){return(o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)};n("models/filters.model",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),n("models/death.model",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),n("models/definition.model",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),n("models/bloodbath.model",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),n("models/index",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0})}),n("permalink",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){}return e.build=function(e){var t=document.querySelector('[data-role="permalink"]'),n=location.href.replace(/#.*$/,""),o="";for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];i&&(o+=(o?"&":"#")+r+"="+i)}t.value=n+o},e}();t.Permalink=n}),n("config",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.config={},this.configPath="./data/config/settings.json",this.init(e)}return e.prototype.init=function(e){var t=this;qwest.get(this.configPath).then(function(n,o){t.config=o,e&&e()})},e.prototype.getConfig=function(e){return this.config[e]},e}();t.Config=n}),n("events",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){}return e.addEventHandler=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on "+t,n)},e.removeEventHandler=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},e}();t.Events=n}),n("helper/stringUtils.helper",["require","exports"],function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){}return e.normalizeString=function(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()},e.containsString=function(t,n){return e.normalizeString(t).includes(n)},e}();t.StringUtilsHelper=n}),n("inMemoriam",["require","exports","permalink","config","events","helper/stringUtils.helper"],function(e,t,n,r,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(){this.currentInfoWindows=null,this.eventHandlers={},this.heatMap=null,this.imgHousePath="./assets/images/corps/%house%.png",this.infoWindows=[],this.markerCluster=null,this.markers=[],this.configObject=null}return e.getFilterValueLabel=function(e,t){var n=document.querySelector('form select[name="'+e+'"] option[value="'+t+'"]');return(n?n.innerText:t).replace(/\([\d]+\)/,"").trim()},e.prototype.boot=function(){var e=this;this.configObject=new r.Config(function(){return e.run()})},e.prototype.run=function(){var e={center:new google.maps.LatLng(this.getConfig("defaultLat"),this.getConfig("defaultLon")),mapTypeControl:!1,mapTypeId:google.maps.MapTypeId.HYBRID,maxZoom:this.getConfig("maxZoom"),streetViewControl:!1,zoom:this.getConfig("defaultZoom")},t=document.getElementById("form-filters"),n=document.getElementById("map"),o=new google.maps.Map(n,e);this.bindAnchorEvents(o,n,t),this.bindFilters(o,n,t),this.bindLocalizationButton(o),this.bindRandomizationButton(o),this.bindMarkers(n.dataset.bloodbathSrc,o,this.getFilters(t,!0))},e.prototype.getConfig=function(e){return this.configObject.getConfig(e)},e.prototype.filteredResponse=function(e,t){for(var n=e,o=0,r=Object.entries(t);o<r.length;o++){var i=r[o],s=i[0],l=i[1];if(t.hasOwnProperty(s)){var u=s,c=a.StringUtilsHelper.normalizeString(l);if(l)for(var d=n.deaths.length;d--;)"search"===u&&l.length>=3?a.StringUtilsHelper.containsString(n.deaths[d].text,c)||a.StringUtilsHelper.containsString(n.deaths[d].section,c)||a.StringUtilsHelper.containsString(n.deaths[d].location,c)||a.StringUtilsHelper.containsString(n.deaths[d].keywords,c)||n.deaths.splice(d,1):(!n.deaths[d].published||n.deaths[d][u]&&n.deaths[d][u]!==l)&&n.deaths.splice(d,1)}}return n},e.prototype.getFilters=function(e,t){var n=location.hash.substr(1).split("&"),o={},r={},i=e.querySelectorAll('select[data-filterable="true"], input[data-filterable="true"]');return n.forEach(function(e){var t=e.split("=");2===t.length&&(o[t[0]]=t[1])}),i.forEach(function(e){t&&void 0!==o[e.id]?r[e.id]=o[e.id]:r[e.id]=e.value}),r},e.prototype.alterFiltersLabels=function(e){document.querySelectorAll("form select").forEach(function(t){var n=t.querySelectorAll("option");"true"===t.dataset.countable&&n.forEach(function(n){if(""!==n.value){for(var o in n.dataset.deathCount="0",e.deaths){var r=e.deaths[o];n.value===r[t.name]&&(n.dataset.deathCount=""+(+n.dataset.deathCount+r.count))}n.innerText=n.innerText.replace(/\([\d]+\)/,"")+" ("+n.dataset.deathCount+")"}})})},e.prototype.bindAnchorEvents=function(e,t,n){var o=this;window.addEventListener("hashchange",function(){o.bindFilters(e,t,n,!0),o.bindMarkers(t.dataset.bloodbathSrc,e,o.getFilters(n,!0))},!1)},e.prototype.bindFilters=function(e,t,n,o){var r=this,a=n.querySelectorAll("form select, form input");i.Events.addEventHandler(n,"submit",function(e){e.preventDefault()}),a.forEach(function(a){var s=r.getFilters(n,o);a.value=void 0!==s[a.name]?s[a.name]:"","function"==typeof r.eventHandlers[a.id]&&i.Events.removeEventHandler(a,"change",r.eventHandlers[a.id]),r.eventHandlers[a.id]=function(){var i=r.getFilters(n,o);return r.bindMarkers(t.dataset.bloodbathSrc,e,i),!1},o&&(a.value=void 0!==s[a.name]?s[a.name]:""),i.Events.addEventHandler(a,"change",r.eventHandlers[a.id])})},e.prototype.clearMarkerCluster=function(){return this.markerCluster&&this.markerCluster.clearMarkers(),this},e.prototype.bindMarkers=function(t,r,i){var a=this;qwest.get(t.replace("%year%",i.year)+"?_="+(new Date).getTime()).then(function(t,s){var l=new google.maps.LatLngBounds,u=[],c=[],d=[],p=s;if(a.alterFiltersLabels(p),p=a.filteredResponse(p,i),a.clearMapObjects(),p.deaths&&p.deaths.length){var g=function(t){var n=p.deaths[t],o=a.imgHousePath.replace("%house%",n.house),i=new google.maps.Marker({map:r,icon:new google.maps.MarkerImage(o),position:new google.maps.LatLng(n.gps.lat,n.gps.lon),title:n.text}),s='\'<h4>\n              <img height="16" src="'+o+'" alt="House: '+n.house+'"  title="House: '+n.house+'" />\n              '+(n.section?n.section+" - ":"")+"\n              "+n.location+"\n              "+(n.count>1?' - <strong style="color: red;">'+n.count+" décès</strong>":"")+"\n            </h4>\n            <span>\n              <strong>Date</strong>: "+n.day+"/"+n.month+"/"+n.year+"\n              <br /><br />\n              <strong>Cause</strong>: "+e.getFilterValueLabel("cause",n.cause)+"\n              <br /><br />\n              <strong>Circonstances</strong>:  "+n.text+"\n            </span>";if(n.sources&&n.sources.length){var l="";for(var g in n.sources){var f=n.sources[g];l+=(l?", ":"")+'<a href="'+f.url+'" target="_blank">'+f.titre+"</a>"}s+="<br /><br /><strong>Sources: </strong>"+l}s+='<br /><small style="float: right"><a href="mailto:contact@geolim4.com?subject='+("Erreur trouvée - "+n.section+" + -  "+n.day+"/"+n.month+"/"+n.year)+'">[Une erreur ?]</a></small>';var h=new google.maps.InfoWindow({content:s});google.maps.event.addListener(i,"click",function(){a.currentInfoWindows&&a.currentInfoWindows.close(),h.open(r,i),a.currentInfoWindows=h}),a.infoWindows.push(h),"interieur"===n.origin?d.push(i):u.push(i),c.push({location:new google.maps.LatLng(n.gps.lat,n.gps.lon),weight:10+(n.count>1?5*n.count:0)}),a.markers.push(i)};for(var f in p.deaths)g(f);a.markerCluster=new MarkerClusterer(r,a.markers,{gridSize:60,imagePath:"./assets/images/clustering/m",maxZoom:14});var h=d.length?d:u;for(var f in h)h.hasOwnProperty(f)&&l.extend(h[f].getPosition());c.length&&(a.heatMap=new google.maps.visualization.HeatmapLayer(o({data:c},a.getConfig("heatmapOptions"))),a.heatMap.setMap(r)),n.Permalink.build(i),a.printDefinitionsText(s),r.fitBounds(l)}else a.printDefinitionsText(null)})},e.prototype.clearMapObjects=function(){this.clearMarkers().clearInfoWindows().clearHeatMap().clearMarkerCluster()},e.prototype.clearMarkers=function(){for(var e=0;e<this.markers.length;e++)this.markers[e].setMap(null);return this.markers=[],this},e.prototype.clearInfoWindows=function(){for(var e=0;e<this.infoWindows.length;e++)google.maps.event.clearInstanceListeners(this.infoWindows[e]),this.infoWindows[e].close();return this.infoWindows=[],this},e.prototype.clearHeatMap=function(){return this.heatMap&&this.heatMap.setMap(null),this},e.prototype.bindLocalizationButton=function(e){var t=this,n=document.createElement("div"),o=document.createElement("button"),r=new google.maps.Marker({map:e,animation:google.maps.Animation.DROP,icon:new google.maps.MarkerImage("./assets/images/map/bluedot.png"),position:{lat:31.4181,lng:73.0776}});o.style.backgroundColor="#FFF",o.style.border="none",o.style.borderRadius="2px",o.style.boxShadow="0 1px 4px rgba(0,0,0,0.3)",o.style.cursor="pointer",o.style.height="28px",o.style.marginTop="10px",o.style.marginLeft="10px",o.style.outline="none",o.style.padding="0px",o.style.width="28px",o.title="Voir autour de moi",n.appendChild(o);var i=document.createElement("div");i.id="localizationImg",i.style.backgroundImage="url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)",i.style.backgroundPosition="0px 0px",i.style.backgroundRepeat="no-repeat",i.style.backgroundSize="180px 18px",i.style.height="18px",i.style.margin="5px",i.style.width="18px",o.appendChild(i),google.maps.event.addListener(e,"dragend",function(){document.querySelector("#localizationImg").style.backgroundPosition="0px 0px"}),o.addEventListener("click",function(){var n="0",o=setInterval(function(){var e=document.querySelector("#localizationImg");n=-18==+n?"0":"-18",e.style.backgroundPosition=n+"px 0px"},500);confirm("La demande de localisation ne servira qu'à positionner la carte autour de vous, aucune donnée ne sera envoyée ni même conservée nulle part.")&&navigator.geolocation?navigator.geolocation.getCurrentPosition(function(n){var i=new google.maps.LatLng(n.coords.latitude,n.coords.longitude);r.setPosition(i),e.setCenter(i),e.setZoom(13);var a=new google.maps.InfoWindow({content:"Ma position approximative"});google.maps.event.addListener(r,"click",function(){t.currentInfoWindows&&t.currentInfoWindows.close(),a.open(e,r),t.currentInfoWindows=a}),a.open(e,r),document.querySelector("#localizationImg").style.backgroundPosition="-144px 0px",clearInterval(o)}):(clearInterval(o),document.querySelector("#localizationImg").style.backgroundPosition="0px 0px")}),e.controls[google.maps.ControlPosition.LEFT_TOP].push(n)},e.prototype.bindRandomizationButton=function(e){var t=this,n=document.createElement("div"),o=document.createElement("button");o.style.backgroundColor="#FFF",o.style.border="none",o.style.borderRadius="2px",o.style.boxShadow="0 1px 4px rgba(0,0,0,0.3)",o.style.cursor="pointer",o.style.height="28px",o.style.marginTop="10px",o.style.marginLeft="10px",o.style.outline="none",o.style.padding="0px",o.style.width="28px",o.title="Voir autour de moi",n.appendChild(o);var r=document.createElement("div");r.id="randomizationImg",r.style.backgroundImage="url(./assets/images/map/random.png)",r.style.backgroundPosition="-2px -2px",r.style.backgroundRepeat="no-repeat",r.style.backgroundSize="120%",r.style.height="18px",r.style.margin="5px",r.style.width="18px",o.appendChild(r),o.addEventListener("click",function(){var n=Math.floor(Math.random()*t.markers.length);t.markers.map(function(t,o){n===o&&(e.setCenter(t.getPosition()),e.setZoom(13),google.maps.event.trigger(t,"click"))})}),e.controls[google.maps.ControlPosition.LEFT_TOP].push(n)},e.prototype.getDefinitions=function(e){var t={};for(var n in e.definitions)if(e.definitions.hasOwnProperty(n))for(var o in e.deaths)if(e.deaths.hasOwnProperty(o)){var r=e.deaths[o];t[n]||(t[n]={}),t[n][r[n]]||(t[n][r[n]]=0),Number.isInteger(r.count)&&r.count>1?t[n][r[n]]+=r.count:t[n][r[n]]++}return t},e.prototype.printDefinitionsText=function(e){var t=[];if(e)for(var n=this.getDefinitions(e),o=0,r=Object.entries(n);o<r.length;o++){for(var i=r[o],a=i[0],s=i[1],l="",u=0,c=Object.entries(s);u<c.length;u++){var d=c[u],p=d[0],g=d[1],f=g>1;if(e.definitions[a][p])l+=(l?", ":"")+e.definitions[a][p][f?"plural":"singular"].replace("%d",g).replace("%"+a+"%",p);else l+=(l?", ":"")+"["+p+"] ("+g+")"}t.push(e.definitions[a]["#label"].replace("%"+a+"%",l))}else t.push("Aucun r&#233;sultat trouv&#233;");document.querySelector('[data-role="definitionsText"]').innerHTML=t.join("<br />")},e}();t.InMemoriam=s}),n("main",["require","exports","inMemoriam"],function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),document.addEventListener("DOMContentLoaded",function(){(new n.InMemoriam).boot()})});var r={};function i(t){if(r[t])return r[t];if("exports"===t)return{};var n=function(t){return e[t]?e[t]:e[t+"/index"]?e[t+"/index"]:{dependencies:["exports"],factory:function(e){try{Object.defineProperty(e,"__cjsModule",{value:!0}),Object.defineProperty(e,"default",{value:require(t)})}catch(e){throw Error(['module "',t,'" not found.'].join(""))}}}}(t);r[t]={};var o=n.dependencies.map(function(e){return i(e)});n.factory.apply(n,o);var a=o[n.dependencies.indexOf("exports")];return r[t]=a.__cjsModule?a.default:a,r[t]}if(null!==t[0])i(t[0])}();