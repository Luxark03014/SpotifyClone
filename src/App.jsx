import { useState } from 'react';
import { Header } from './Header';
import { PlayList } from './PlayList';
import { Footer } from './Footer';

function App() {
  return (
    <>
      <div className="flex flex-col bg-black  min-h-screen">
        <Header />
        <PlayList  />
        <Footer />
      </div>
    </>
  );
}

export default App;
