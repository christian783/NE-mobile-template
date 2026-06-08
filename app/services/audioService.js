import { useCallback, useRef } from 'react';
import {
  createAudioPlayer,
  setAudioModeAsync,
  useAudioPlayer as useExpoAudioPlayer,
  useAudioPlayerStatus
} from 'expo-audio';

const configureAudio = async () => {
  await setAudioModeAsync({
    allowsRecording: false,
    playsInSilentMode: true
  });
};

const releasePlayer = (player) => {
  if (!player) {
    return;
  }

  try {
    player.pause();
    player.remove();
  } catch (error) {
    console.error('Failed to release audio', error);
  }
};

export const playAudio = async (audioUrl) => {
  let player;
  let intervalId;

  try {
    await configureAudio();
    player = createAudioPlayer(audioUrl, { updateInterval: 250 });

    await new Promise((resolve, reject) => {
      intervalId = setInterval(() => {
        const status = player.currentStatus;

        if (status?.error) {
          reject(new Error(status.error));
        }

        if (status?.didJustFinish) {
          resolve();
        }
      }, 250);

      player.play();
    });
  } catch (_error) {
    throw new Error('AUDIO_PLAYBACK_FAILED');
  } finally {
    if (intervalId) {
      clearInterval(intervalId);
    }

    releasePlayer(player);
  }
};

export const useAudioPlayer = () => {
  const player = useExpoAudioPlayer(null, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);
  const currentUrlRef = useRef(null);
  const isPlaying = Boolean(status?.playing);

  const stop = useCallback(() => {
    try {
      player.pause();
    } catch (error) {
      console.error('Failed to pause audio', error);
    }
  }, [player]);

  const play = useCallback(
    async (audioUrl) => {
      if (!audioUrl) {
        return;
      }

      try {
        await stop();
        await configureAudio();

        if (currentUrlRef.current !== audioUrl) {
          player.replace(audioUrl);
          currentUrlRef.current = audioUrl;
        }

        player.play();
      } catch (_error) {
        throw new Error('AUDIO_PLAYBACK_FAILED');
      }
    },
    [player, stop]
  );

  return { isPlaying, play, stop };
};

export default {
  playAudio,
  useAudioPlayer
};
