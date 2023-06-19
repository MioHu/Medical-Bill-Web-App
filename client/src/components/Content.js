import React from "react";

const Content = props => {
  const {bill} = props;

  return(
    <>
      <p>
        <span className="fw-bold">Date of Service</span>: {bill.date}
        <br/>
        <span className="fw-bold">Hospital Name</span>: {bill.hospital}
      </p>

      <p>
        <span className="fw-bold">Patient Name</span>: {bill.patient}
        <br/>
        <span className="fw-bold">Address</span>: {bill.line1}<br/>
        { bill.line2 !== '' && 
          <>
            <span className="invisible">Address1</span> {bill.line2}<br/>
          </>
        }
        <span className="invisible">Address1</span> {bill.city}, {bill.state} {bill.zip}<br/>
        <span className="invisible">Address1</span> {bill.country}
      </p>
      
      <p>
        <span className="fw-bold">Bill Amount</span>: ${parseFloat(bill.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}
      </p>

      <p>
        <img src={bill.image} alt="Bill image" className="w-50"/>
      </p>
    </>
  );
};

export default Content;