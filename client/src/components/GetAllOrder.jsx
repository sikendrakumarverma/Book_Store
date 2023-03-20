import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { SERVER_URI } from '../config/keys';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function GetAllOrder() {

    let [data, setData] = useState([]);
    const [searchData, setSearchData] = useState({
        bookName: '',
        minPrice:'',
        maxPrice: '',
        startingDate: '',
        endingDate:''
    });

    const handleChange = (prop) => (event) => {
        setSearchData({ ...searchData, [prop]: event.target.value });
    };

    let navigate = useNavigate();

    useEffect(() => {
        // if (!localStorage.getItem('token')) {
        //     navigate("/login")
        // }
        GetOrderData();

    }, [])

    async function GetOrderData() {
        await axios.get(`${SERVER_URI}/getAllOrder`, {
            headers: {
                "x-api-key": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setData(response.data.data)
                //alert(`success : ${response.data.message}`)
            })
            .catch((error) => {
                console.log("error :", error.response.data.message)
                alert(`Error: ${error.response.data.message}`)
            })

    }

    function SearchOrder() {
        //console.log("click",searchData)
        navigate("/searchOrder", { state: searchData })
    }


    return (
        <div >
            <h1 style={{ color: "white" }}> All Ordered List</h1>
            <div style={{background:"#bec6dcff",marginLeft:"100px",marginRight:"100px",borderRadius:"5px"}}>
            <div >
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search ordered By BookName"
                        aria-label="Search"
                        style={{ marginTop:"5px",marginLeft:"5px",width: "900px" }}
                        className="me-5"
                        value={searchData.bookName}
                        onChange={handleChange('bookName')}
                        // onChange={(e) => { setSearchData(e.target.value) }}
                    />
                    <br />
                    <Button style={{marginTop:"5px"}} onClick={() => { SearchOrder() }} variant="outline-success">Search</Button>
                </Form>
            </div>
            <h6 style={{ marginRight:"850px",marginTop: "5px" }}>Search Ordered By Price Range</h6>
            <div>
                <Form className="d-flex">
                    <Form.Control
                        type="Number"
                        placeholder="50"
                        style={{marginLeft:"5px", width: "392px" }}
                        className="me-5"
                        aria-label="Search"
                        value={searchData.minPrice}
                        onChange={handleChange('minPrice')}
                        // onChange={(e) => { setSearchData(e.target.value) }}
                    /><h4 style={{ marginRight: "40px" }}>to</h4>
                    <Form.Control
                        type="Number"
                        placeholder="600"
                        style={{ width: "395px" }}
                        className="me-5"
                        aria-label="Search"
                        value={searchData.maxPrice}
                        onChange={handleChange('maxPrice')}
                        // onChange={(e) => { setSearchData(e.target.value) }}
                    />
                    {/* <Button onClick={() => { SearchBook() }} variant="outline-success">Search</Button> */}
                </Form>
            </div>

            <h6 style={{  marginRight:"780px",marginTop: "5px" }}>Search Ordered By Purchase date Range</h6>
            <div>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="2023-03-04"
                        style={{ marginBottom:"5px",marginLeft:"5px",width: "390px" }}
                        className="me-5"
                        aria-label="Search"
                        value={searchData.startingDate}
                        onChange={handleChange('startingDate')}
                        // onChange={(e) => { setSearchData(e.target.value) }}
                    /><h4 style={{ marginRight: "40px" }}>to</h4>
                    <Form.Control
                        type="search"
                        placeholder="2023-11-06"
                        style={{marginBottom:"5px",marginLeft:"5px", width: "395px" }}
                        className="me-5"
                        aria-label="Search"
                        value={searchData.endingDate}
                        onChange={handleChange('endingDate')}
                        // onChange={(e) => { setSearchData(e.target.value) }}
                    />
                    {/* <Button onClick={() => { SearchBook() }} variant="outline-success">Search</Button> */}
                </Form>
            </div>
            </div>
            <br />
            <div className="col-sm-10 offset-sm-1" style={{ background: "skyblue" }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Ordered Book</th>
                            <th>Order Amount</th>
                            <th>Ordered Status</th>
                            <th>OrderedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) =>
                            <tr key={index}>
                                <td>{item.bookName}</td>
                                <td>{item.bookPrice}</td>
                                <td>{item.status}</td>
                                <td>{item.createdAt}</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default GetAllOrder;