import React from "react";
import { Link, useParams } from "react-router-dom";
import Content from "../components/Content";

const Open = props => {
  const {id} = useParams();
  const {billList} = props;
  const bill = billList[id];

  return(
    <>
      <h2>Bill Information</h2>
      <p><Link to="/">Back Home</Link></p>
      <Content bill={bill}/>
    </>
  );
};

export default Open;