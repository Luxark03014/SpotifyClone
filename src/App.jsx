import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { PlayList } from './PlayList';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { InfoArtista } from './InfoArtista';
import { songs } from './data/songs';
import { useHowler } from './hooks/useHowler';

const App = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const { sound, play, pause, isPlaying, prev, next, currentSongIndex, currentTime, duration, seek, analyser, dataArray, changeVolume, changeHighshelfGain } = useHowler(selectedSong ? selectedSong.src : null, songs);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    console.log("Canción seleccionada:", song.titulo);
  };

  useEffect(() => {
    if (currentSongIndex >= 0 && currentSongIndex < songs.canciones.length) {
      const song = songs.canciones[currentSongIndex];
      setSelectedSong(song);
      console.log("Canción actualizada:", song.titulo);
    }
  }, [currentSongIndex]);

  return (
    <div className="flex flex-col bg-black min-h-screen">
      <Header />
      <div className="flex flex-grow gap-4">
        <PlayList onSongSelect={handleSongSelect} />
        <MainLayout 
          currentSong={songs.canciones[currentSongIndex]} 
          isPlaying={isPlaying} 
          analyser={analyser} 
          dataArray={dataArray} 
        />
        <InfoArtista song={selectedSong} changeHighshelfGain={changeHighshelfGain}/>
      </div>
      <Footer 
        song={selectedSong} 
        isPlaying={isPlaying} 
        play={play} 
        pause={pause} 
        prev={prev} 
        next={next} 
        currentTime={currentTime} 
        duration={duration}
        seek={seek}
        changeVolume={changeVolume} 
      />
    </div>
  );
};

export default App;
