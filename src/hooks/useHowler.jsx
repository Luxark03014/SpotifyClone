import { useEffect, useState } from "react";
import { Howl } from "howler";

export const useHowler = (initialSrc, songs) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    if (!songs || !songs.canciones || songs.canciones.length === 0) {
      console.error("Songs or canciones are not defined.");
      return; // Exit if no songs are available
    }

    // Si hay un sonido en reproducción, lo detiene y lo elimina
    if (sound) {
      sound.unload(); // Desenlaza el sonido anterior
      setIsPlaying(false);
    }

    // Si se proporciona una fuente inicial válida, crea una nueva instancia de Howl
    if (initialSrc) {
      const newSound = new Howl({
        src: [initialSrc],
        html5: true,
        onend: () => next(), // Reproduce automáticamente la siguiente canción cuando termine la actual
      });
      setSound(newSound);
      newSound.play(); // Inicia la reproducción de la canción
      setIsPlaying(true); // Cambia el estado a reproducido
    }
  }, [initialSrc, songs]);

  const play = () => {
    if (sound) {
      sound.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
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
        if (sound) {
            sound.unload(); // Desenlaza el sonido anterior
        }

        setCurrentSongIndex(index); // Cambia el índice actual

        const newSound = new Howl({
            src: [songs.canciones[index].src],
            volume: 1.0,
            html5: true,
            onend: () => next(),
        });
        setSound(newSound);
        newSound.play(); // Reproduce la nueva canción
        setIsPlaying(true); // Cambia el estado a reproducido
        
        // Aquí actualiza la canción seleccionada
        setSelectedSong(songs.canciones[index]);
    }
};


  return {
    play,
    pause,
    isPlaying,
    prev,
    next,
    currentSongIndex,
  };
};
