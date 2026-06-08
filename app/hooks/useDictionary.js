import { useCallback, useState } from 'react';

import { fetchWord } from '../api/dictionaryApi';
import { useHistory } from '../context/HistoryContext';
import { sanitizeWord, validateInput } from '../utils/validateInput';

const ERROR_MESSAGES = {
  WORD_NOT_FOUND: "We couldn't find a definition for this word.",
  NETWORK_ERROR: 'No internet connection. Please check your network and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again.'
};

export const useDictionary = () => {
  const { addToHistory } = useHistory();
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);

  const search = useCallback(
    async (word) => {
      const validation = validateInput(word);

      if (!validation.valid) {
        setError(validation.error);
        setErrorType(null);
        setWordData(null);
        return { wordData: null, error: validation.error, errorType: null };
      }

      const sanitizedWord = sanitizeWord(word);

      setLoading(true);
      setError(null);
      setErrorType(null);
      setWordData(null);

      try {
        const response = await fetchWord(sanitizedWord);
        const primaryWord = Array.isArray(response) ? response[0] : null;

        if (!primaryWord) {
          throw new Error('SERVER_ERROR');
        }

        setWordData(primaryWord);
        await addToHistory(sanitizedWord);
        return { wordData: primaryWord, error: null, errorType: null };
      } catch (requestError) {
        const typedError = ERROR_MESSAGES[requestError.message]
          ? requestError.message
          : 'SERVER_ERROR';
        const message = ERROR_MESSAGES[typedError];

        setErrorType(typedError);
        setError(message);
        return { wordData: null, error: message, errorType: typedError };
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  return {
    wordData,
    loading,
    error,
    errorType,
    search
  };
};

export default useDictionary;
