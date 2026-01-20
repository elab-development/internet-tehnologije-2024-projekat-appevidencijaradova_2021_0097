import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = ({token,removeToken}) => {
    const [userRole, setUserRole] = useState("");//state za prihavatnje user role a
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("Guest");

    //efekat za dohvatanje uloge kada se promeni token
    useEffect(() =>{
        if(token){
            axios.get("api/user", {
                headers:{
                    Authorization: 'Bearer '+ token,//postavljanje headera za autorizaciju
                },
            }).then((response) =>{
                setUserRole(response.data.role);//update user role-a
                setUsername(response.data.name);
            }).catch((error) =>{
                console.log(error);
                setUsername("Guest");
            });
        }else{
            setUserRole("");
            setUsername("Guest");
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
            setUsername("Guest");
            navigate("/login");
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
                        {token && userRole ==="student" && <NavLink to="/upload" text="Slanje fajlova" />}
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
                    <div className="navbar-text ms-auto">
                        {username}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;