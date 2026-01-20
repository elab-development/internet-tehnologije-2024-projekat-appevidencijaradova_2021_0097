import TextField from "../komponente/TextInputField";
import Button from "../komponente/Button";
import useApiRequest from "../hooks/useApiRequest";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ()=>{

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const {fetchData, loading, error} = useApiRequest();//destrukturacija potrebnih vrednosti iz hook-a
    let navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        fetchData(() => axios.post('api/register',userData))
        .then((data) => {
            if(data){
                console.log('Registration successful',data);
                navigate('/login');
            }else if(error){
                console.error('Registration failed. Error: ',error);
            }
        });
    };
    const handleInput = (e) => {
        setUserData({...userData,[e.target.name]:e.target.value});
    };

    return(
        <section className="vh-100" style={{paddingTop:'4.5rem'}}>
            <div className="container-fluid h-custom">
                <div className="justify-content-center align-items-center h-100">

                    <h3 className="mb-5">Molimo unesite vase parametre za registraciju</h3>

                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-4">
                        <form onSubmit={handleRegister}>
                            <TextField
                                type="text"
                                id="nameRegister"
                                placeholder="Korisnicko ime"
                                name="username"
                                onInput={handleInput}
                            />

                            <TextField
                                type="email"
                                id="emailRegister"
                                placeholder="E-mail"
                                name="email"
                                onInput={handleInput}
                            />

                            <TextField
                               type="password"
                                id="passwordRegister"
                                placeholder="Password"
                                name="password"
                                onInput={handleInput} 
                            />


                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <Button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Registracija u toku...' : 'Registracija'}
                                    </Button>
                                    {error && <p className="text-danger">Error: {error}</p>}
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Imate nalog? <a href="/login" className="link-danger">Prijava</a>
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
export default RegisterPage;