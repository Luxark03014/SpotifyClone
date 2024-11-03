import { useEffect, useRef } from 'react';

export const MainLayout = ({ currentSong, isPlaying, analyser, dataArray }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!analyser || !dataArray || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const draw = () => {
            if (!isPlaying) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);

            const barWidth = (canvas.width / dataArray.length) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
                barHeight = dataArray[i];
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                x += barWidth + 1;
            }

            requestAnimationFrame(draw);
        };

        draw();
    }, [analyser, dataArray, isPlaying]);

    return (
        <div className="w-1/2 rounded-lg p-4 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
            {currentSong ? (
                <div>
                    <p className="text-lg">{currentSong.titulo}</p>
                    <p className="text-sm text-gray-400">{currentSong.artista}</p>
                    <canvas ref={canvasRef} width={600} height={400} className="mt-4 w-full bg-black" />
                </div>
            ) : (
                <p>No song selected</p>
            )}
        </div>
    );
};
