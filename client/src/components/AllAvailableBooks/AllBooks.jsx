//import logo from "./logo.svg";
import "../../App.css";
import Users1 from "./Books";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SERVER_URI } from "../../config/keys";

import axios from "axios";
import { useState } from "react";

function AllBooks() {

  let navigate= useNavigate();

  const [users, setUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  
  useEffect(() => {
    axios.get(`${SERVER_URI}/getAllBooks`).then((response) => {
      //console.log(response.data.data)
      setUsers(response.data.data);
    });

    return () => { };
  }, []);

  function SearchBook() {
    console.log("click")
    navigate("/searchBook", { state: searchData })
  }


  return (
    <div>
      <h1 style={{color:"white"}}> All Books List</h1>
      <br />
      <div >

        <div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Book By Name"
              style={{ width: "900px" }}
              className="me-5"
              aria-label="Search"
              onChange={(e) => { setSearchData(e.target.value) }}
            />
            <Button onClick={() => { SearchBook() }} variant="outline-success" >Search</Button>
          </Form>
        </div>
        <br />
        <div style={{ display: "flex", }} >
          <div>
            <Users1 users={users} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default AllBooks;