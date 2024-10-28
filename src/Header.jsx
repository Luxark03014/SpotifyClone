import { assets } from "./assets/assets";

export const Header = () => {
  return (
    <header className="w-full h-16 bg-black text-white flex items-center">
      
      <div className="flex items-center mx-5">
        <img
          className="p-2 m-5 h-14"
          src={assets.spotify_logo}
          alt="spotify-logo"
        />
      </div>

      
      <div className=" w-2/4 flex justify-center items-center mx-auto">
        <div className="flex  items-center gap-2">
          <div className="rounded-full p-2  bg-gris-spotify">
            <img className="w-8" src={assets.home_icon} alt="home-icon" />
          </div>
          <div className="flex p-2 h-12  bg-gris-spotify rounded-full items-center">
            <img className="w-8 mx-2" src={assets.search_icon} alt="search-icon" />
            <input
              className=" rounded-tr-full  rounded-br-full  bg-gris-spotify text-white placeholder-gray-400 h-12 outline-none rounded-3 flex-grow p-2 "
              placeholder="¿Qué quieres reproducir?"
            />
            
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 mx-8">
        <img src={assets.bell_icon} className="w-8" alt="bell-icon" />
        <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
         
        </div>
      </div>

    </header>
  );
};
