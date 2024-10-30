import { useState , useEffect } from 'react';

import { Howl } from 'howler';

export const  useHowler = (url) => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        if (!url) return;

        const newSound = new Howl({
            src: [url],
            format: ['mp3'],
            html5: true,
            volume: 0.5,
            onend: () => {
                console.log('Terminó la canción');
            },
        });

        setSound(newSound);
        newSound.play();

        return () => {
            newSound.stop();
            newSound.unload();
          
        };
    }, [url]);

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
    
    const stop = () => {
        if (sound) {
            sound.stop();
        }
    };

    const isPlaying = () => {
        return sound ? sound.playing() : false;
    };  

    return{
        play,
        pause,
        stop,
        isPlaying,
    }
}