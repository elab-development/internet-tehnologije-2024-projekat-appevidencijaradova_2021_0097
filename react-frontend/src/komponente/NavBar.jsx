import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import axios from "axios";

const NavBar = ({token,removeToken}) => {
    const [userRole, setUserRole] = useState("");//state za prihavatnje user role a
    const location = useLocation();

    //efekat za dohvatanje uloge kada se promeni token
    useEffect(() =>{
        if(token){
            axios.get("api/user", {
                headers:{
                    Authorization: 'Bearer '+ token,//postavljanje headera za autorizaciju
                },
            }).then((response) =>{
                setUserRole(response.data.role);//update user role-a
            }).catch((error) =>{
                console.log(error);
            });
        }
    },[token]);

    //funkcija za odjavljivanje korisnika
    function handleLogout(event){
        event.preventDefault();

        var config ={
            method:"post",
            url:"api/logout",
            headers:{
                Authorization: "Bearer "+window.localStorage.getItem("auth_token"),
            },
        };

        axios(config).then(function(response){
            console.log(JSON.stringify(response.data));
            removeToken();
        }).catch(function(error){
            console.log(error);
        });
    }

    //prikaz NavBar-a u zavisnosti od uloge korisnika
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Evidencija radova</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to="/" text="Pocetna" />
                        <NavLink to="/contact" text="Kontakt"/>
                        {token && <NavLink to="/upload" text="Slanje fajlova" />}
                        {token && userRole ==="profesor" && <NavLink to="/users" text="Studenti" />}
                        {token && userRole ==="profesor" && <NavLink to="/documents" text="Pregled radova" />}
                        {!token ? (
                            location.pathname !== "/login" && (
                                <a className="nav-link" href="/login">Login</a>
                            )
                        ):(
                            <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                        )}
                        {!token && location.pathname !== "/register" && (
                            <a className="nav-link" href="/register">Register</a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;