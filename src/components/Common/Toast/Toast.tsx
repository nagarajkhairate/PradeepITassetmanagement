// src/Toast.tsx
import React from 'react';
import { ToastContainer, ToastContainerProps, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomToastProps {
  position?: ToastContainerProps['position'];
  autoClose?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
}
const notifySuccess = (message: string) => toast.success(message);
const notifyError = (message: string) => toast.error(message);
const CustomToastContainer: React.FC<CustomToastProps> = ({
  position = "bottom-right",
  autoClose = 3000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
}) => {


  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
    />
  );
};

export { CustomToastContainer as ToastContainer, notifySuccess, notifyError };
