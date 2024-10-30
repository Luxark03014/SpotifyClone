import { useState } from 'react';
import { Header } from './Header';
import { PlayList } from './PlayList';
import { Footer } from './Footer';
import { MainLayout } from './MainLayout';
import { InfoArtista } from './InfoArtista';
function App() {
  return (
    <>
      <div className="flex flex-col bg-black  min-h-screen">
        <Header />
        <div className="flex  bg-black  min-h-screen">
        <PlayList  />
        <MainLayout />
        <InfoArtista />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
