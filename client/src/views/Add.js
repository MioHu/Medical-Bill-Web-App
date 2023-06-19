import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import Content from "../components/Content";

const Add = props => {
  const {billList, currentUser} = props;
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getLabels(), []);

  const [bill, setBill] = useState({patient:'', line1:'', line2:'', city:'', state:'', zip:'', country:'', hospital:'', date:'', amount:'', image:'', user:currentUser});
  const [page, setPage] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setPage(true);
  };

  const billAdd = () => {
    billList.push(bill);
    navigate("/");
  };

  const edit = () => {
    setPage(false);
  };

  if(page){
    return(
      <>
        <h3>Summary</h3>
        <Content bill={bill}/>
        <button onClick={edit} className="btn btn-primary me-3 px-4">Edit</button>
        <button onClick={billAdd} className="btn btn-primary">Submit</button>
      </>
    );
  } else {
    return(
      <>
        <h2>Add a New Bill</h2>
        <p><Link to="/">Back Home</Link></p>
        <form onSubmit={handleSubmit} className="w-50">
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Patient Name</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, patient:e.target.value})} value={bill.patient} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Address Line1</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, line1:e.target.value})} value={bill.line1} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Address Line2</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, line2:e.target.value})} value={bill.line2}/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">City</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, city:e.target.value})} value={bill.city} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">State</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, state:e.target.value})} value={bill.state} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">ZIP</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, zip:e.target.value})} value={bill.zip} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Country</label>
            <select className="form-select form-select-sm" value={bill.country} onChange={e => setBill({...bill, country:e.target.value})} required="required">
              <option value="" selected disabled hidden>Choose here</option>
              {options.map((item,idx) => 
                <option key={idx}>{item}</option>
              )}
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Hospital</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, hospital:e.target.value})} value={bill.hospital} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Date</label>
            <input type="date" className="form-control form-control-sm" onChange={e => setBill({...bill, date:e.target.value})} value={bill.date} required="required"/>
          </div>
          <div className="mb-2">
            <label className="form-label mb-1 fw-bold">Bill Amount</label>
            <input type="number" className="form-control form-control-sm" onChange={e => setBill({...bill, amount:e.target.value})} value={bill.amount} required="required"/>
          </div>
          <div className="mb-3">
            <label className="form-label mb-1 fw-bold">Image URL</label>
            <input type="text" className="form-control form-control-sm" onChange={e => setBill({...bill, image:e.target.value})} value={bill.image} required="required"/>
          </div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </>
    );
  }
};

export default Add;