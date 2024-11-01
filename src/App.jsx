import { useState } from 'react';
import { Header } from './Header';
import { PlayList } from './PlayList';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { InfoArtista } from './InfoArtista';
function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <>
      <div className="flex flex-col bg-black min-h-screen">
        <Header />
        <div className="flex flex-grow ">
        <PlayList  onSongSelect={setSelectedSong}/>
        <MainLayout />
        <InfoArtista song={selectedSong}/>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
