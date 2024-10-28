import { assets } from "./assets/assets";
import { useState } from "react";
import { Howl, Howler } from "howler";
import { SongsProvider } from "./context/SongContext";
export const Footer = () => {
  const [pause, setPause] = useState(false);

  

  function clickPause() {
    setPause(!pause);
  }


  return (
    <SongsProvider>
    <footer className="w-full h-20 flex items-center  bg-black text-white">
      <div className="p-4">
        <div className="bg-white w-12 h-12"></div> {/*Icono Provisional */}
      </div>
      <div className="flex flex-col">
        <h1 className="text-md">Titulo Cancion</h1>
        <h3 className="text-sm">Artista</h3>
      </div>

      <div className="justify-center items-center">
        <div className="gap-6">
          <button>
            <img className="w-4 h-4" src={assets.shuffle_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.prev_icon} />
          </button>

          <button onClick={clickPause}>
            {pause ? (
              <img className="w-4 h-4"  src={assets.pause_icon} />
            ) : (
              <img className="w-4 h-4"  src={assets.play_icon} />
            )}
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.next_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.loop_icon} />
          </button>
        </div>
      </div>
      <div className="ml-auto gap-4 flex mx-5">
        <button>
            <img className="w-4 h-4"  src={assets.plays_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.mic_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.queue_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.speaker_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.volume_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.mini_player_icon} />
          </button>
          <button>
            <img className="w-4 h-4"  src={assets.zoom_icon} />
          </button>
      </div>
    </footer>
    </SongsProvider>
  );
};
