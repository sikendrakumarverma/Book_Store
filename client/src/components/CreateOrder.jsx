// import { Header } from "./Header";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { SERVER_URI } from '../config/keys';


function CreateOrder() {

  let location = useLocation();
  let bookData = location.state;
  console.log(bookData)

  let navigate = useNavigate();

  useEffect(() => {
    //  if (!localStorage.getItem('token')) {
    //       navigate("/login")
    //  }
  }, [])

  const [bookName, setBookName] = useState(bookData.name);
  const [bookPrice, setBookPrice] = useState(bookData.price);

  let CreateOrderUrl = `${SERVER_URI}/createOrder`

  function signUp() {

    let bodyData = {};

    bodyData.bookName = bookName;
    bodyData.bookPrice = bookPrice;

    axios.post(CreateOrderUrl, bodyData)
      .then((response) => {
        console.log("response", response)
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
        }).then(() => {
          navigate("/GetAllOrdered");
          //window.location.reload()
        })
      })
      .catch((error) => {
        console.log("error", error.response.data.message)
        // alert(`Error: ${error.response.data.message}`)
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
        //window.location.reload();
      })
  }

  return (

    <>
      {/* <Header /> */}
      <h1 style={{color:"white"}}> Create Order</h1>
      <div className="col-sm-6 offset-sm-3">
        <input type="text" value={bookName} className="form-control" placeholder={bookData.name} />
        <br />
        <input type="text" value={bookPrice} className="form-control" placeholder={bookData.price} />
        <br />
        <br />
        <button onClick={signUp} className="btn btn-primary">Create Order</button>

      </div>
    </>
  )
}

export default CreateOrder;