import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function UserCard(props) {

  let navigate = useNavigate();

  let name = props.user.name;
  let allDataOfBook = props.user;

  // if (name.length > 10) {
  //   name = name.substring(0, 10) + "...";
  // }
  
  useEffect(() => {
    return () => {
    };
  }, []);

  function MakeOrder(item) {
    //console.log(item)
    navigate("/createOrder",{state: item} )
  };

  return (
    <>
    <div
      className={`product-card ${props.ind % 2 === 0 ? "bg-tomato" : "bg-dodgerblue"
        }`}
      >
      <img style={{width:240,height:170}} src={props.image} alt="" />
      <h5 title={props.name}>{name}</h5>
      <div style={{display:"flex"}}>
      <p style={{color:"white"}}> MRP Rs - </p>
      <h5 style={{color:"blue"}}> ₹{allDataOfBook.price}.00 /-</h5>
      </div>
      <div className="actions">
        <Button variant="outline-success" onClick={() => { MakeOrder(allDataOfBook) }}>Buy Book</Button>
        {/* <Button variant="outline-success"  onClick={UpdateBookData}>Update</Button> */}
      </div>
      
    </div>
    </>
  );
}

export default UserCard;