import toast from 'react-hot-toast';

export const showSuccessToast = (message: string, duration = 5000) => {
  toast.success(message, {
    position: 'bottom-right',
    duration
  });
};

export const showErrorToast = (message: string, duration = 5000) => {
  toast.error(message, { position: 'bottom-right', duration });
};
