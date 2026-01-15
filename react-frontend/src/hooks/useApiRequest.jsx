//ovaj hook je mehanizam za izvrsavanje API zahteva i pracenja njegovog stanja

//useState -> za pracenje stanja podataka
//data -> sadrzi podatke iz API odgovora
//error -> sadrzi gresku ako postoji
//loading -> govori nam da li je zahtev u toku

import { useState } from "react";

const useApiRequest = (initialData = null) =>{
    
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchData = async(apiFunction, ...args)=>{
        try{
            
            setLoading(true); //ukljucuje loading -> zahtev je u toku
            setError(null); // brise prethodno stanje greske pre slanja novog zahteva
            const response = await apiFunction(...args);

            //provera da li odgovor sadrzi ocekivane podatke
            if(response && response.data){
                setData(response.data); //azuriramo stanje sa podacima iz odgovora
                return response.data;//vracamo podatke za trenutnu upotrebu
            }else{
                throw new Error('Nisu primljeni podaci iz odgovora');
            }


        }catch(err){

            setError(err);//azuriranje stanja greske sa uhvacenom greskom
            console.error('Greska pri zahtevu ka API-ju',err);
            
            
            //pruzanje daljih informacija o gresci ako su dostupne
            if (err.response){
                console.error('Odgovor sa servera:',err.response);
                //vraca detalje u gresci
            }else{
                return {error:err};
                //vraca opstu gresku ako nema odgovora
            }


        }finally{
            setLoading(false);
            //zavrsava se loading stanje na kraju
        }
    };

    return {data,error,loading,fetchData};
};

export default useApiRequest;