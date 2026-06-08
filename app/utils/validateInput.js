export const validateInput = (word = '') => {
  const trimmed = word.trim();

  if (!trimmed) {
    return { valid: false, error: 'Please enter a word to search.' };
  }

  if (/\d/.test(trimmed) || /[^a-zA-Z-\s]/.test(trimmed)) {
    return { valid: false, error: 'Word must contain letters only.' };
  }

  if (trimmed.length > 60) {
    return { valid: false, error: 'Word is too long.' };
  }

  return { valid: true };
};

export const sanitizeWord = (word = '') => word.trim().toLowerCase();

export default validateInput;
