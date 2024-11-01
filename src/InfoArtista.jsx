import { assets } from "./assets/assets";

export const InfoArtista = ({ song }) => {
    return (
        <div className="w-1/4  p-4 rounded-lg bg-gris-spotify">
            {song ? (
                <div className="flex flex-col items-start">
                    <img className="mt-4 rounded-lg w-full mx-auto" src={song.portada} alt={song.titulo} />
                    <div className="mt-2 flex justify-between items-center w-full">
                        <div>
                            <h1 className="text-[30px] text-white font-bold">{song.titulo}</h1>
                            <h2 className="text-[18px] text-gris-texto font-medium">{song.artista}</h2>
                        </div>
                        <img src={assets.like_icon} alt="heart icon" className="w-5 h-5" /> 
                    </div>
                </div>
            ) : (
                <h1 className="text-lg font-bold text-white">Selecciona una canción</h1>
            )}
        </div>
    );
};
