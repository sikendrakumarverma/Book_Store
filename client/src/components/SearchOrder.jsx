import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";
import { SERVER_URI } from '../config/keys';
import Swal from "sweetalert2";

function SearchOrdersData() {

    let location = useLocation();
    let bookData = location.state;
    let { bookName, minPrice, maxPrice, startingDate, endingDate } = bookData
    let [data, setData] = useState([]);

    let navigate = useNavigate();
    useEffect(() => {
        // if (!localStorage.getItem('token')) {
        //     navigate("/login")
        // }
        getBooksData()

    }, [bookData])

    const backendServer = `${SERVER_URI}/getOrdersByQ?bookName=${bookName}&minPrice=${minPrice}&
maxPrice=${maxPrice}&startingDate=${startingDate}&endingDate=${endingDate}`

    function getBooksData() {
        console.log("call", bookData)
        axios.get(backendServer, {
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
                    text: `${error.response.data.message}`,
                    timer: 2500
                })
                navigate('/GetAllOrdered')
            })

    }

    return (
        <div >
            <h1 style={{ color: "white" }}> Search Orders List</h1>
            {/* <p> Number of Order={response.data.totalOrders}</p> */}
            <div className="col-sm-10 offset-sm-1" style={{ background: "skyblue" }} >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>OrderedId</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>OrderedAt</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) =>
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.bookName}</td>
                                <td>{item.bookPrice}</td>
                                <td>{item.createdAt}</td>

                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default SearchOrdersData;