import React from "react";
import UserCard from "./BooksCard";

export default function Users(props) {
  //console.log(props.users[0].name)
  return (
    <div className="product-wrapper">
      {props.users.map((item, index) => (
        <UserCard
          key={item._id}
          ind={index}
          user={item}
          image={props.users[index].bookCover}
          
        />
      ))}
    </div>
  );
}

