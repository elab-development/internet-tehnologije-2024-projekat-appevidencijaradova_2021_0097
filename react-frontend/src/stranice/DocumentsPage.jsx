import Button from "../komponente/Button";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useEffect, useState } from "react";

const DocumentsPage = () => {

    const [documents, setDocuments] = useState([]);//state za cuvanje dokumenata
    const [currentPage, setCurrentPage] = useState(0);//state za trenutnu stranicu za paginaciju
    const [documentsPerPage] = useState(5);//state za broj dokumenata po stranici

    useEffect(() => {
        fetchDocuments();//dohvatanje dokumenata
    }, []);

    const fetchDocuments = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                console.error("Auth token nije pronadjen");
                return;
            }

            const response = await axios.get("/api/documents", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDocuments(response.data.documents);
        } catch (error) {
            console.error("Greska pri dohvatanju dokumenata: ", error);
        }
    };

    const handlePlagiarism = async (id) => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                console.error("Nije pronadjen auth_token");
                return;
            }

            const response = await axios.post(`/api/check-plagiarism/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(`Procenat plagijarizma za dokument sa ID: ${id} je ${response.data.plagPercent}%`);

        } catch (error) {
            console.error("Greska pri proveri plagijarizma: ", error);
        }
    };

    const handleDelete = async (documentId) => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                console.error("Nije pronadjen auth_token");
                return;
            }

            await axios.delete(`/api/documents/${documentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            fetchDocuments();

        } catch (error) {
            console.error("Greska pri brisanju dokumenta: ", error);
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);//postavlja trenutnu stranicu na izabranu
    };

    

    const indexOfLastDocument = (currentPage + 1) * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;

    const currentDocuments = documents.slice(
        indexOfFirstDocument,
        indexOfLastDocument
    );

    // Dodato: prazni redovi da tabela uvek bude ista visina
    const emptyRowsCount = documentsPerPage - currentDocuments.length;
    const emptyRows = Array.from({ length: emptyRowsCount }, (_, index) => (
        <tr key={`empty-${index}`}>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
            <td className="align-middle">&nbsp;</td>
        </tr>
    ));

    return (
        <div className="container mt-5">

            <div className="row">
                <div className="col-md-7 mx-auto">
                    <h1 className="mb-5 fw-bold">Dokumenti</h1>
                    <div className="d-flex flex-column align-items-center">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="col-2">Dokument ID</th>
                                    <th className="col-2">Naziv dokumenta</th>
                                    <th className="col-2">Student</th>
                                    <th className="col-2">Proveri plagijarizam</th>
                                    <th className="col-2">Obrisi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentDocuments.map((document) => (
                                    <tr key={document.id}>
                                        <td className="align-middle">{document.id}</td>
                                        <td className="align-middle">{document.filename}</td>
                                        <td className="align-middle">{document.user}</td>
                                        <td className="align-middle text-center">
                                            <Button
                                                className="btn btn-warning py-1"
                                                onClick={() => handlePlagiarism(document.id)}>Proveri</Button>
                                        </td>
                                        <td className="align-middle text-center">
                                            <Button
                                                className="btn btn-warning py-1"
                                                onClick={() => handleDelete(document.id)}>Obrisi</Button>
                                        </td>
                                    </tr>
                                ))}

                                {/* Dodato: prazni redovi */}
                                {emptyRows}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={"Prethodna"}
                            nextLabel={"Sledeca"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(documents.length / documentsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;
