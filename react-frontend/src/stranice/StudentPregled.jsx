import { useEffect,useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const StudentPregled = () =>{

    const[documents, setDocuments] = useState([]);
    const[currentPage, setCurrentPage] = useState(0);
    const documentsPerPage = 5;

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

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const tableRows = documents.flatMap((document)=>{
        if(document.reportovi && document.reportovi.length >0){
            return document.reportovi.map((report,index)=>({
                key:`${document.id}-${index}`,
                id:document.id,
                filename: document.filename,
                plagPercent: report.plagPercent,
                komentar: Komentar(report.plagPercent),
                datum: report.created_at
                    ? new Date(report.created_at).toLocaleDateString()
                    :"/"
            }));
        }

        return[{
            key:document.id,
            id:document.id,
            filename:document.filename,
            plagPercent:"/",
            komentar:"Nije provereno",
            datum:"/"
        }];
    });

    const indexOfLastDocument = (currentPage+1)*documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

    const currentDocuments = tableRows.slice(
        indexOfFirstDocument,
        indexOfLastDocument
    );

    const emptyRowsCount = documentsPerPage - currentDocuments.length;
    const emptyRows = Array.from({length: emptyRowsCount}, (_,index)=>(
        <tr key={`empty-${index}`}>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
        </tr>
    ));

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7 mx-auto">
                    <h1 className="mb-5 fw-bold">Moji dokumenti</h1>
                    <div className="d-flex flex-column align-items-center">
                        <div className="table-responsive">
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
                                {currentDocuments.map((row) => (
                                    <tr key={row.key}>
                                        <td className="align-middle">{row.id}</td>
                                        <td className="align-middle">{row.filename}</td>
                                        <td className="align-middle">{row.plagPercent}</td>
                                        <td className="align-middle">{row.komentar}</td>
                                        <td className="align-middle">{row.datum}</td>
                                    </tr>
                                ))}
                            {emptyRows}
                            </tbody>    
                            </table>
                        </div>
                        <ReactPaginate
                            previousLabel={"Prethodna"}
                            nextLabel={"Sledeca"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(tableRows.length / documentsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassname = {"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

};

export default StudentPregled;