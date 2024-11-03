import { Howl } from 'howler';
import { useEffect, useState } from 'react';

export const useHowler = (initialSrc, songs) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);
    useEffect(() => {
        if (initialSrc) {
            // Detener el sonido anterior si existe
            if (sound) {
                sound.stop();
            }

            // Crear un nuevo sonido con la nueva fuente
            const newSound = new Howl({
                src: [initialSrc],
                html5: true, // Para streaming
                onplay: () => setIsPlaying(true),
                onend: () => setIsPlaying(false),
                onpause: () => setIsPlaying(false),
                onstop: () => setIsPlaying(false),
            });

            setSound(newSound);
            newSound.play(); // Comenzar a reproducir
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = 2048;
            const bufferLength = analyserNode.frequencyBinCount;
            const newDataArray = new Uint8Array(bufferLength);
            setDataArray(newDataArray);
            setAnalyser(analyserNode);

            // Conectar el nodo al contexto de audio
            const sourceNode = audioContext.createMediaElementSource(newSound._sounds[0]._node);
            sourceNode.connect(analyserNode);
            analyserNode.connect(audioContext.destination);

            setSound(newSound);
            // Limpiar el efecto
            return () => {
                newSound.stop(); // Detener cuando el componente se desmonte o la fuente cambie
                setSound(null); // Limpiar la referencia
            };
            
        }
    }, [initialSrc]);
    const play = () => {
        if (sound) {
            sound.play();
        }
    };

    const pause = () => {
        if (sound) {
            sound.pause();
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
    



    
    useEffect(() => {
        let intervalId;
        if (isPlaying && sound) {
            intervalId = setInterval(() => {
                setCurrentTime(sound.seek());
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isPlaying, sound]);

   

    const loadSong = (index) => {
        if (songs.canciones[index]) {
            if (sound) {
                sound.stop();
                sound.unload();
            }
            setCurrentSongIndex(index);
            const newSrc = songs.canciones[index].src;
            const newSound = new Howl({
                src: [newSrc],
                html5: true,
                onload: () => {
                    setDuration(newSound.duration());
                },
                onplay: () => {
                    setIsPlaying(true);
                },
            });

            setSound(newSound);
            newSound.play();
        }
    };

    const seek = (time) => {
        if (sound) {
            sound.seek(time);
            setCurrentTime(time);
        }
    };

    return {
        sound,
        play,
        pause,
        isPlaying,
        prev,
        next,
        currentSongIndex,
        currentTime,
        duration,
        seek,
        analyser,
        dataArray,
    };
};
