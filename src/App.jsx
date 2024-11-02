import { useState } from 'react';
import { Header } from './Header';
import { PlayList } from './PlayList';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { InfoArtista } from './InfoArtista';
import { songs } from './data/songs';
import { useHowler } from './hooks/useHowler';

function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const { play, pause, isPlaying, prev, next } = useHowler(selectedSong ? selectedSong.src : null, songs.canciones);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    console.log("Canción seleccionada:", song.titulo);
  };

  console.log("Estados y funciones:", { isPlaying, play, pause, prev, next });

  return (
    <div className="flex flex-col bg-black min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <PlayList onSongSelect={handleSongSelect} />
        <MainLayout />
        <InfoArtista song={selectedSong} />
      </div>
      <Footer 
        song={selectedSong} 
        isPlaying={isPlaying} 
        play={play} 
        pause={pause} 
        prev={prev} 
        next={next} 
      />
    </div>
  );
}

export default App;
