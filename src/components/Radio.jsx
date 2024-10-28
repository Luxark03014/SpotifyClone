

import { fetchRadio } from "../services/radioService";
import { useEffect, useState } from "react";


export const Radio = () => {
    const  [radioData, setRadioData] = useState([]);

    useEffect(() => {
        const loadRadio = async () => {
          try {
            const data = await fetchRadio();
            setRadioData(data); 
          } catch (err) {
            console.error("Error al importar radio", err);
          }
        };
    
        loadRadio();
      }, []);
        
    return(

        <div className="radio">
            <h2>Radio</h2>
            <ul>
            {radioData.map((radio) => (
                <li key={radio.id}>{radio.tittle}</li>
            ))
           
        }
         </ul>
        </div>
    )

}