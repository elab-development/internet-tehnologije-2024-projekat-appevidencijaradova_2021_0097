import { useEffect,useState } from "react";
import axios from "axios";

const StudentPregled = () =>{

    const[documents, setDocuments] = useState([]);

    useEffect(()=>{
        fetchDocuments();
    },[]);

    const fetchDocuments = async () =>{
        try {
            const token = localStorage.getItem("auth_token");
            if(!token){
                console.error("Auth token nije pronadjen");
                return;
            }

            const response = await axios.get("/api/documents-user",{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });

            setDocuments(response.data);
            
        } catch (error) {
            console.error("Greska pri dohvatanju dokumenata", error);
        }
    };

    const Komentar = (plagPercent) =>{
        if(plagPercent <= 10) return "U redu je";
        if(plagPercent <= 30) return "Pazi se";
        if(plagPercent <= 50) return "Preterao si";
        return "Mora ponovo";
    };

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <h1 className="mb-5 fw-bold">Moji dokumenti</h1>
                    <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="col-2">DokumentID</th>
                                    <th className="col-2">Naziv dokumenta</th>
                                    <th className="col-2">Procenat plagijarizma</th>
                                    <th className="col-2">Komentar</th>
                                    <th className="col-2">Datum provere</th>
                                </tr>
                            </thead>
                            <tbody>
                            {documents.map((document) =>
                                document.reportovi && document.reportovi.length > 0 ?(
                                    document.reportovi.map((report,index) =>(
                                        <tr key={`${document.id}-${index}`}>
                                            <td className="align-middle">{document.id}</td>
                                            <td className="align-middle">{document.filename}</td>
                                            <td className="align-middle">{report.plagPercent}</td>
                                            <td className="align-middle">{Komentar(report.plagPercent)}</td>
                                            <td className="align-middle">
                                                {report.created_at ? new Date(report.created_at).toLocaleDateString()
                                                                :"/"}
                                            </td>
                                        </tr>
                                    ))
                                ):(
                                    <tr key={document.id}>
                                        <td className="align-middle">{document.id}</td>
                                        <td className="align-middle">{document.filename}</td>
                                        <td className="align-middle">/</td>
                                        <td className="align-middle">Nije provereno</td>
                                        <td className="align-middle">/</td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default StudentPregled;