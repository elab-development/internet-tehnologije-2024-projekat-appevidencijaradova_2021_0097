import Button from "../komponente/Button";
import TextField from "../komponente/TextInputField";

const LoginPage = ({addToken}) =>{

    function handleInput(){};
    function handleLogin(){};
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