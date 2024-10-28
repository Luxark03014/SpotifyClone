import { assets } from "../assets/assets";

export const PlaylistCard = ( {imagen, titulo, subtitulo}) => {
  
  
  
  return (


    <section className=" p-2 flex  items-center">
      <div className="w-12 h-12 mr-3">
        <img src={imagen} className="rounded-lg w-full h-full" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm text-white">{titulo}</h1>
        <h3 className="text-xs text-gris-texto">{subtitulo}</h3>
      </div>
    </section>
  );
};
