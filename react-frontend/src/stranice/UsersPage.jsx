//Stranica za upravljanje korisnicima
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../komponente/Button";


const UsersPage = () => {

    const[users, setUsers] = useState([]);//State za cuvanje liste korisnika
    const[updatingUserId, setUpdatingUserId] = useState(null);//state za ID korisnika koji se azurira
    const[updateFormData, setUpdateFormData] = useState({
        name: "",
        email: "",
        password: "",
    });//state za podatke forme za azuriranje korisnika

    const[searchTerm, setSearchTerm] = useState("");//state za podatak po kom pretrazujemo
    const[sortOption, setSortOption] = useState("id-asc");//state za opciju sortiranja
    const[currentPage, setCurrentPage] = useState(0);//state za trenutnu stranicu za paginaciju
    const[usersPerPage] = useState(5);//state za broj korisnika po stranici

    useEffect(() => {
        fetchUsers();//poziva funkciju koja dohvata korisnike pri montiranju komponente
    },[]);

    const fetchUsers = async () => {
        try{
            const token = localStorage.getItem("auth_token");//dohvatanje tokena iz lokalnog skladista
            if(!token){
                console.error("Access token nije pronadjen u skladistu");//ispis greske ako se ne pronadje token
                return;
            }

            const response = await axios.get("/api/users",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data);//Update stanja sa listom korisnika koju smo dohvatili
            console.log("Dohvaceni korisnici: ",response.data);

        }catch(error){
            console.error("Greska prilikom dohvatanja korisnika: ",error);//ispis greske ako ne mogu da se dohvate korisnici
        }
    };


    //funkcija za azuriranje korisnika
    const handleUpdate = (userId) =>{
        setUpdatingUserId(userId);//uzimamo i postavljamo ID korisnika kog azuriramo
        const selectedUser = users.find((user) => user.id === userId);//po ID-u pronalazimo korisnika
        setUpdateFormData({
            name: selectedUser.name,
            email: selectedUser.email, 
        });//azurira state za podatke forme za azuriranje korisnika
    };


    //handler za slanje forme za azuriranje
    const handleUpdateFormSubmit = async (e) =>{
        e.preventDefault();//sprecavamo refresh stranice
        try{
            const token = localStorage.getItem("auth_token");
            if(!token){
                console.error("Nije pronadjen access token");
                return;
            }

            await axios.put(`/api/update-user/${updatingUserId}`,updateFormData,{
                headers:{
                    Authorization: `Bearer ${token}`,//postavlja token u zaglavlje za autorizaciju
                },
            });

            setUpdatingUserId(null);//resetujemo ID korisnika kog zelimo da azuriramo
            setUpdateFormData({name: "", email: ""});//resetujemo podatke forme nakon izvresnja
            fetchUsers();//osvezavamo listu korisnika
        }catch(error){
            console.error("Greska pri azuriranju korisnika: ",error);//ispis greske ako ne uspe update
        }
    };

    //funkcija za brisanje korisnika
    const handleDelete = async (userId) =>{
        try{
            const token = localStorage.getItem("auth_token");
            if(!token){
                console.error("Nije pronadjen access token");
                return;
            }
            await axios.delete(`/api/destroy-user/${userId}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUsers();
        }catch(error){
            console.error("Greska pri brisanju korisnika: ",error);
        }
    };

    //handler za promenu stranice
    const handlePageClick = (event) =>{
        setCurrentPage(event.selected);//postavlja trenutnu stranicu na izabranu
    };
    //switch za sortOption

    let filteredAndSortedUsers = users.filter((user)=>
        user.name.toLowerCase().startsWith(searchTerm.trim().toLowerCase())
    );

    switch(sortOption){
        case "name-asc":
            filteredAndSortedUsers.sort((a,b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            filteredAndSortedUsers.sort((a,b) => b.name.localeCompare(a.name));
        break;
        case "id-asc":
            filteredAndSortedUsers.sort((a,b) =>a.id - b.id);
        break;
        case "id-desc":
            filteredAndSortedUsers.sort((a,b) =>b.id-a.id);
        break;
        default:
            break;
    }
    //handler za eksportovanje
    const handleExport = ()=>{
        const token = localStorage.getItem("auth_token");
            if(!token){
                console.error("Nije pronadjen access token");
                return;
            }
        axios.get('/api/export-users',{
            responseType:'blob',
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response =>{
            //kreiramo url iz BLOB-a i iniciramo preuzimanje
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'users.csv';//ime fajla koji preuzimamo
            document.boddy.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => console.error('Error: ', error));
    };

    const indexOfLastUser = (currentPage+1) * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredAndSortedUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );
    //izracunavanje indeksa za trenutnu stranicu + dohvatanje korisnika za nju



    return(
        <div className="container mt-5">
            <h1 className="offset-3">Korisnici</h1>
            <div className="row">
                <div className="col-md-7 offset-3">
                    <div className="col-md-12 d-flex justify-content-between">
                        <div className="col-md-7">
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Pretrazi korisnike..."
                                className="form-control mb-3" 
                            />
                        </div>
                        <div className="col-md-4">
                            <select 
                                value={sortOption} 
                                onChange={(e) => setSortOption(e.target.value)}
                                className="form-control mb-3"
                            >
                                <option value="id-asc">ID uzlazno</option>
                                <option value="id-desc">ID silazno</option>
                                <option value="name-asc">Abecedno uzlazno</option>
                                <option value="name-desc">Abecedno silazno</option>
                            </select>
                        </div>
                    </div>
                    {updatingUserId ? (
                        <form onSubmit={handleUpdateFormSubmit}>
                            <input 
                                type="text"
                                value={updateFormData.name}
                                onChange={(e) => 
                                    setUpdateFormData({...updateFormData, name: e.target.value})
                                }
                                placeholder="Ime"
                                className="form-control mb-2" 
                            />

                            <input 
                                type="text"
                                value={updateFormData.email}
                                onChange={(e) => 
                                    setUpdateFormData({...updateFormData, email: e.target.value})
                                }
                                placeholder="Email"
                                className="form-control mb-2" 
                            />
                            <Button
                                type="submit"
                                className ="btn btn-success py-1">
                                Sacuvaj promene
                            </Button>
                        </form>
                    ):(
                        <div className="d-flex flex-column align-items-center">
                            <table className="table table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th className="col-1">ID</th>
                                        <th className="col-4">Ime</th>
                                        <th className="col-4">Email</th>
                                        <th className="dugme">Azuriraj</th>
                                        <th className="dugme">Obrisi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user)=>(
                                        <tr key={user.id}>
                                            <td className="align-middle">{user.id}</td>
                                            <td className="align-middle">{user.name}</td>
                                            <td className="align-middle">{user.email}</td>
                                            <td className="align-middle">
                                                <Button
                                                className="btn btn-warning py-1"
                                                onClick={() => handleUpdate(user.id)}
                                                >Azuriraj
                                                </Button>
                                            </td>
                                            <td className="align-middle">
                                                <Button
                                                    className="btn btn-danger py-1"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Obrisi
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <ReactPaginate 
                                previousLabel={"Prethodna"}
                                nextLabel={"Sledeca"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(filteredAndSortedUsers.length / usersPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                        </div>
                    )}
                </div>
                <div className="d-flex justufy-content-end mb-2">
                    <Button className="btn btn-success" onClick={handleExport}>
                        Oceni studente
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;