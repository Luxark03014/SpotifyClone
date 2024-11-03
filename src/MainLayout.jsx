import { useEffect } from 'react';

export const MainLayout = ({ currentSong, isPlaying, analyser, dataArray }) => {
    useEffect(() => {
        const canvas = document.getElementById('equalizer');
        const context = canvas.getContext('2d');

        const draw = () => {
            if (!analyser || !dataArray) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);

            const barWidth = (canvas.width / dataArray.length) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
                barHeight = dataArray[i];

                context.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                context.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1; // Espaciado entre las barras
            }

            requestAnimationFrame(draw);
        };

        // Comienza el dibujo solo si hay una canción y está en reproducción
        if (isPlaying) {
            draw();
        }

        return () => {
            // Aquí puedes limpiar cualquier efecto si es necesario
        };
    }, [analyser, dataArray, isPlaying]);

    return (
        <div className="w-1/2 rounded-lg p-4 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
            {currentSong ? (
                <div>
                    <p className="text-lg">{currentSong.titulo}</p>
                    <p className="text-sm text-gray-400">{currentSong.artista}</p>
                    <canvas 
                        id="equalizer"
                        width={600} 
                        height={400} 
                        className="mt-4 w-full bg-black"
                    />
                </div>
            ) : (
                <p>No song selected</p>
            )}
        </div>
    );
};
