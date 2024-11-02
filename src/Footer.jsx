export const Footer = ({ song, isPlaying, play, pause, prev, next }) => {
  return (
    <footer className="w-full h-20 flex items-center bg-black text-white">
      {song ? (
        <>
          <div className="p-4">
            <img src={song.portada} alt={song.titulo} className="w-12 h-12 rounded-sm" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-md font-bold">{song.titulo}</h1>
            <h3 className="text-sm font-semibold">{song.artista}</h3>
          </div>
          <div className="flex flex-grow justify-center items-center">
            <div className="flex justify-center items-center gap-6">
              <button onClick={prev}>
                <img className="w-4 h-4" src="/assets/prev.png" alt="Previous" />
              </button>
              <button onClick={() => (isPlaying ? pause() : play())}>
                {isPlaying ? (
                  <img className="w-4 h-4" src="/assets/pause.png" alt="Pause" />
                ) : (
                  <img className="w-4 h-4" src="/assets/play.png" alt="Play" />
                )}
              </button>
              <button onClick={next}>
                <img className="w-4 h-4" src="/assets/next.png" alt="Next" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-grow text-center">
          <h3 className="text-md">Selecciona una canción para reproducir</h3>
        </div>
      )}
    </footer>
  );
};