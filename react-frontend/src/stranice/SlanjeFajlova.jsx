import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../komponente/Button";
import axios from "axios";

const SlanjeFajlova = ({authToken}) =>{

    const [file, setFile] = useState(null);//state za cuvanje izabranog fajla

    //funkcija koja se poziva kada se izabere fajl
    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);//postavljanje izabranog fajla u stanje
    };

    let navigate = useNavigate();//instanciranje navigate a za kasniju navigaciju

    //funkcija za slanje fajla na server
    const handleUpload = ()=>{
        if(file) {//provera da li je fajl izabran
            const formData = new FormData();//kreiramo formdata objekat za slanje fajla
            formData.append('file',file);//dodajemo file u formData

            //slanje POST zahteva sa fajlom i headerom za autorizaciju
            axios.post('/api/uploadFile',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',//postavljanje content type-a u multipart-form-data
                    'Authorization': `Bearer ${authToken}`,//dodavanje tokena za autorizaciju
                },
            }).then(response =>{
                console.log(response.data);//logujemo odgovor servera
            }).catch(error =>{//obrada mogucih gresaka
                if(error.response){
                    console.error('Error response:', error.response); // Logovanje detalja o grešci
                    console.log('Data:', error.response.data);
                    console.log('Status:', error.response.status);
                    console.log('Headers:', error.response.headers);
                }else if(error.request){
                    console.error('Error request: ',error.request);//logovanje greske u zahtevu
                }else{
                    console.error('Error message:',error.message);//logovanje poruke greske
                }
                console.error('Config:',error.config);//logovanje konfiguracije zahteva
            });
            
        }else{
            console.error('Nije izabran file za upload');//logovanje ako file nije izabran
        }
        navigate("/");//salje nas na pocetnu stranu nakon slanja fajla
    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-4">
                    <div className="mb-3">
                    {/*input polje za izbor fajla*/}
                    <label htmlFor="fileInput" className="form-label mb-4 fs-4 fw-bold">Izaberite file</label>
                    <input 
                        type="file"
                        className="form-control"
                        id="fileInput"
                        onChange={handleFileChange} 
                    />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Button className="btn btn-primary" onClick={handleUpload}>
                            <p className="m-0">Posalji</p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SlanjeFajlova;