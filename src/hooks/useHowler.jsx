import { useEffect, useState } from "react";
import { Howl } from "howler";

export const useHowler = (initialSrc, songs) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    // Descarga cualquier sonido actual antes de cargar uno nuevo
    if (sound) {
      sound.unload();
      setIsPlaying(false);
    }

    // Si hay una nueva fuente, crea y asigna un nuevo sonido
    if (initialSrc) {
      const newSound = new Howl({
        src: [initialSrc],
        html5: true,
        onend: () => next(),
      });
      setSound(newSound);
    }
  }, [initialSrc]);

  const play = () => {
    console.log("Intentando reproducir");
    if (sound) {
      sound.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    console.log("Intentando pausar");
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const next = () => {
    const newIndex = (currentSongIndex + 1) % songs.canciones.length;
    loadSong(newIndex);
  };

  const prev = () => {
    const newIndex = (currentSongIndex - 1 + songs.canciones.length) % songs.canciones.length;
    loadSong(newIndex);
  };

  const loadSong = (index) => {
    if (songs.canciones[index]) {
      setCurrentSongIndex(index);
      setIsPlaying(false);
      const newSound = new Howl({
        src: [songs.canciones[index].src],
        volume: 1.0,
        html5: true,
        onend: () => next(),
      });
      setSound(newSound);
      newSound.play();
      setIsPlaying(true);
    }
  };

  return {
    play,
    pause,
    isPlaying,
    prev,
    next,
  };
};
