import Button from "../komponente/Button";
import TextField from "../komponente/TextInputField";
import useApiRequest from "../hooks/useApiRequest";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({addToken}) =>{

    //pravimo state koji cuva korisnicke podatke
    const[userData,setUserData] = useState({
        email: "",
        password: "",
    });

    //funkcija za azuriranje state-a korisnickih podataka na osnovu unosa
    function handleInput(e){
        let newUserData = {...userData};//kopira trenutno stanje korisnickih podataka
        newUserData[e.target.name] = e.target.value;//azurira vrednost za uneseno polje
        setUserData(newUserData);//postavlja novo stanje sa azuriranim podacima
    };
    //hook za navigaciju
    let navigate = useNavigate();
    //useApiRequest hook
    const{fetchData} = useApiRequest();

    //funkcija koja se poziva prilikom slanja forme za prijavu
    async function handleLogin(e){
        e.preventDefault();//sprecava podrazumevano ponasanje forme

        const response = await fetchData(() => axios.post("api/login",userData));//poziva API za logovanje

        if(response && response.success){
            const{access_token : token} = response;//destrukturisanje za izvlacenje tokena iz odgovora
            if(token){
                window.localStorage.setItem("auth_token",token);//cuva token u lokalnom skladistu
                addToken(token);//prosledjuje token u state aplikacije
                navigate("/");//navigacija na pocetnu stranu
            }else{
                console.error("Prijava nije uspela: Nedostaje token u odgovoru");
            }
        }else{
            console.error("Opsta greska kod odgovora ili neuspesan poziv API-ja",response);
        }
    };
    return(
        <section className="vh-100" style={{paddingTop:4.5+"rem",}}>
            <div className="container-fluid h-custom">
                <div className=" justify-content-center align-items-center h-100">
            
                    <h3 className="">Molimo unesite vase parametre za logovanje</h3>
                    
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
                        <form onSubmit={handleLogin}>
                            <TextField 
                                type="email"
                                id="emailLogin"
                                placeholder="Unesite email adresu"
                                name="email"
                                onInput={(e)=>handleInput(e)}
                            />
                            
                            <TextField 
                                type="password"
                                id="passwordLogin"
                                placeholder="Unesite vasu sifru"
                                name="password"
                                onInput={(e)=>handleInput(e)}
                            />

                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <Button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{paddingLeft:"2.5rem",paddingRight:"2.5rem"}}
                                    >
                                        Prijava
                                    </Button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Nemate nalog?{"   "}
                                        <a href="/register" className="link-danger">  Registracija</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default LoginPage;