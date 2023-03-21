import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SERVER_URI } from '../config/keys';

function SearchBooksData() {

    let location = useLocation();
    let bookData = location.state;
console.log(bookData)
    let [data, setData] = useState([]);

    let navigate = useNavigate();
    useEffect(() => {
        // if (!localStorage.getItem('token')) {
        //     navigate("/login")
        // }
        getBooksData()

    }, [bookData])



    function getBooksData() {
        axios.get(`${SERVER_URI}/getAllBooks?name=${bookData}`, {
            headers: {
                "x-api-key": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setData(response.data.data)
                //alert(`success : ${response.data.message}`)
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    timer: 2500
                  })
            })
            .catch((error) => {
                console.log("error :", error.response.data.message)
                //alert(`Error: ${error.response.data.message}`)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: `${error.response.data.message} by ${bookData}`,
                    timer: 2500
                    
                })
                navigate('/')
            })

    }

    return (
        <div >
            <h1 style={{ color: "white" }}> Search Books List</h1>
            <div className="col-sm-10 offset-sm-1" style={{ background: "skyblue" }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>BooksId</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>ReleasedAt</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) =>
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td><img style={{ width: 100 }} src={item.bookCover} /></td>
                                <td>{item.price}</td>
                                <td>{item.releasedAt}</td>
                              
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default SearchBooksData;