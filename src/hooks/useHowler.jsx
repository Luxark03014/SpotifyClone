import { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';

export const useHowler = (initialSrc, songs) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState(null);

    useEffect(() => {
        if (!songs || !songs.canciones || songs.canciones.length === 0) {
            console.error("Songs or canciones are not defined.");
            return;
        }

        if (initialSrc) {
            const newSound = new Howl({
                src: [initialSrc],
                html5: true,
                onload: () => {
                    setDuration(newSound.duration());

                    // Crear el analizador
                    const audioContext = Howler.ctx;
                    const analyserNode = audioContext.createAnalyser();
                    analyserNode.fftSize = 2048;
                    const bufferLength = analyserNode.frequencyBinCount;
                    const newDataArray = new Uint8Array(bufferLength);
                    setDataArray(newDataArray);
                    setAnalyser(analyserNode);

                    // Conectar el analizador al nodo de salida
                    newSound.connect(analyserNode);
                    analyserNode.connect(audioContext.destination);
                },
                onplay: () => {
                    setIsPlaying(true);
                },
                onend: () => {
                    next();
                },
                onpause: () => {
                    setIsPlaying(false);
                },
            });

            setSound(newSound);
        }

        return () => {
            if (sound) {
                sound.stop();
                sound.unload();
            }
        };
    }, [initialSrc, songs]);

    useEffect(() => {
        let intervalId;
        if (isPlaying && sound) {
            intervalId = setInterval(() => {
                setCurrentTime(sound.seek());
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isPlaying, sound]);

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

    const loadSong = (index) => {
        if (songs.canciones[index]) {
            const currentSong = songs.canciones[currentSongIndex];
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

            newSound.connect(analyser);
            analyser.connect(Howler.masterGain);
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