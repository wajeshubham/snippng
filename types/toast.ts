export type ToastVariantType = "success" | "error" | "info";

export interface ToastInterface {
  message: string;
  description?: string;
  type?: ToastVariantType;
}

export interface ToastContextInterface {
  addToast: (toast: ToastInterface) => void;
}
