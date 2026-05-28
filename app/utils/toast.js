import Toast from 'react-native-toast-message';

let lastToast = {
  type: '',
  message: '',
  shownAt: 0
};

const showToast = (type, message) => {
  const normalizedMessage = message || 'Something went wrong. Please try again.';
  const now = Date.now();

  if (
    lastToast.type === type &&
    lastToast.message === normalizedMessage &&
    now - lastToast.shownAt < 1500
  ) {
    return;
  }

  lastToast = {
    type,
    message: normalizedMessage,
    shownAt: now
  };

  Toast.show({
    type,
    text1: type === 'success' ? 'Success' : 'Error',
    text2: normalizedMessage,
    position: 'top',
    visibilityTime: 3500
  });
};

export const getErrorMessage = (error) => {
  const data = error?.response?.data;

  if (typeof data === 'string') {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    const firstError = data.errors[0];
    return firstError?.message || firstError;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};

export const showSuccess = (message) => {
  showToast('success', message);
};

export const showError = (message) => {
  showToast('error', message);
};
