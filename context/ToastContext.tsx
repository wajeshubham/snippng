import { Toast } from "@/components";
import { ToastContextInterface, ToastInterface } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const ToastContext = createContext<ToastContextInterface>({
  addToast: () => {},
});

const useToast = () => useContext(ToastContext);

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);

  const addToast = (toast: ToastInterface) => {
    if (toasts.length >= 4) return;
    setToasts((toasts) => [...toasts, toast]);
  };

  useEffect(() => {
    if (toasts.length <= 0) return;
    const timer = setTimeout(() => {
      setToasts((toasts) => toasts.slice(1));
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none z-50 fixed right-0 bottom-0 w-full flex flex-col gap-4 items-end px-4 py-6 sm:items-start sm:p-6"
      >
        {toasts.map((toast, index) => {
          return (
            <Toast
              key={index}
              {...toast}
              onClose={() => {
                setToasts((toasts) => toasts.filter((_, i) => i !== index));
              }}
            />
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export { useToast, ToastContext, ToastProvider };
