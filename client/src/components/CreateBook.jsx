// import { Header } from "./Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { SERVER_URI } from '../config/keys';
import Swal from 'sweetalert2';


function Add() {

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
  }, [])

  const [file, setFile] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [releasedAt, setReleasedAt] = useState("")

  let CreateBookUrl = `${SERVER_URI}/books`

  function signUp() {

    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('releasedAt', releasedAt);

    axios.post(CreateBookUrl, formData, {
      headers: {
        "x-api-key": localStorage.getItem("token")
      }
    })
      .then((response) => {
        console.log("response", response)
        //alert(`success : ${response.data.message}`)
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
          // timer: 2500
        }).then(() => {
          navigate("/");
        })

      })
      .catch((error) => {
        console.log("error", error.response.data.message)
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
          text: error.response.data.message
        })
      })

  }

  return (

    <>
      {/* <Header /> */}
      <h1 style={{color:"white"}}> Add Book</h1>
      <div className="col-sm-6 offset-sm-3">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" placeholder="bookCover" />
        <br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" />
        <br />
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Price" />
        <br />
        <input type="text" value={releasedAt} onChange={(e) => setReleasedAt(e.target.value)} className="form-control" placeholder="releasedAt" />
        <br />
        <button onClick={signUp} className="btn btn-primary">Add Book</button>

      </div>
    </>
  )
}

export default Add;