import { assets } from "./assets/assets";
import { BotonPlayList } from "./components/BotonPlayList";
import { PlaylistCard } from "./components/PlaylistCard";
import { Radio } from "./components/Radio";
import { songs } from "./data/songs";

import { useState } from "react";

export const PlayList = ( {onSongSelect}) => {
 

  const handleSongClick = (song) => {
    onSongSelect(song);
  };
  
    


  return (
    <section className="w-1/5 bg-gris-spotify-oscuro p-2 rounded-lg flex-grow">
      <div className="flex items-center ">
        <img className="mt-4 mx-4 w-6 h-6" src={assets.stack_icon} />
        <h2 className="text-gris-texto mt-4 ">Tu biblioteca</h2>
        <div className="flex ml-auto items-center gap-2 mt-4">
          <img className="w-5 h-5" src={assets.plus_icon} />
          <img className="mx-4  w-5 h-5" src={assets.arrow_icon} />
        </div>
        
      </div>
      <div className="flex items-center gap-4  mt-6 mx-2">
        <BotonPlayList inputText="Listas" />
        <BotonPlayList inputText="Albumes"/>
        <BotonPlayList inputText="Artistas"/>
      </div>
    
        <div className="p-2 mt-5 mx-2 flex items-center ">
            <img className="w-5 h-5" src={assets.search_icon} />
            <div className="ml-auto flex gap-5 items-center">
            <h3 className="text-gris-texto">Recientes</h3>
            <img className="w-5 h-5" src={assets.queue_icon} />
            </div>

        </div>
       
        <div className="flex flex-col">
            <Radio />
            {songs.canciones.map((cancion) => (
          <PlaylistCard
            key={cancion.id}
            imagen={cancion.portada}
            titulo={cancion.titulo}
            subtitulo={`${cancion.artista} · ${Math.floor(cancion.duracion / 60)}:${String(cancion.duracion % 60).padStart(2, '0')}`}
            onClick={() => handleSongClick(cancion)}
            />
        ))}
        </div>
    </section>
  );
};
