import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import Swal from "sweetalert2";

export function Header() {
    const [searchData, setSearchData] = useState("");

    let navigate = useNavigate();
    let userEmail = localStorage.getItem("loggedInUser")

    function Logout() {
        localStorage.clear();
        Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'Logged Out!',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 2500
        }).then(() => {
            navigate("/")
            //window.location.reload()
        })
    }

    return (
        <div style={{background:"#6E6E6E"}}>
            <Navbar bg="light-white" expand="lg">

                <Navbar.Brand href="#"  > Navbar </Navbar.Brand>

                <Nav
                    className="me-auto nav_bar_wrraper"
                >
                    <Link to='/' className="space">Home</Link>
                    <Link to='/GetAllOrdered' className="space">All Ordered</Link>
                    {
                        localStorage.getItem('token') ?
                            <>
                                <Link to='/CreateBook' className="space">Add Book</Link>

                            </> : <>
                                <Link to='/register' className="space">Register</Link>
                                {/* <Link to='/login' className="space">Login</Link> */}
                            </>
                    }
                </Nav>

                {localStorage.getItem('token') ?
                    <div className="logiContent" >
                        <Nav >
                            <NavDropdown title={userEmail} className="logiContent" >
                                <NavDropdown.Item onClick={Logout}> Logout</NavDropdown.Item>
                                <NavDropdown.Item > Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </div>
                    : null}

            </Navbar>

        </div>

    );
}