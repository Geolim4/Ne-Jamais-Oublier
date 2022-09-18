export interface ModalOptions {
  confirmButtonColor?: 'danger'|'warning'|'primary'|'';
  cancelButtonColor?: 'danger'|'warning'|'primary'|'';
  confirmCallback?: VoidFunction;
  cancelCallback?: VoidFunction;
  requiresExplicitCancel?: boolean;
  isError?: boolean;
  isLarge?: boolean;
  okLabel?: string;
  cancelLabel?: string;
  onceShown?: VoidFunction;
}
