import { toast } from 'react-hot-toast';

const BASE_OPTIONS = {
  duration: 3500,
};

export const toastSuccess = (message, options = {}) =>
  toast.success(message, {
    ...BASE_OPTIONS,
    icon: '✅',
    className: 'toast-base toast-success',
    ...options,
  });

export const toastError = (message, options = {}) =>
  toast.error(message, {
    ...BASE_OPTIONS,
    icon: '❌',
    className: 'toast-base toast-error',
    ...options,
  });

export const toastLevelUp = (message, options = {}) =>
  toast(message, {
    ...BASE_OPTIONS,
    duration: 4500,
    icon: '🎉',
    className: 'toast-base toast-level',
    ...options,
  });

export const toastBadgeEarned = (message, options = {}) =>
  toast(message, {
    ...BASE_OPTIONS,
    duration: 4500,
    icon: '🏅',
    className: 'toast-base toast-badge',
    ...options,
  });

export const toastInfo = (message, options = {}) =>
  toast(message, {
    ...BASE_OPTIONS,
    icon: '✨',
    className: 'toast-base toast-info',
    ...options,
  });
