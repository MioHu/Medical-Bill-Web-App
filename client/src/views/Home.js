import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = props => {
  const navigate = useNavigate();

  const {currentUser, billList, handleLogout} = props;

  const handleDelete = bill => {
    let idx = billList.indexOf(bill);
    billList.splice(idx, 1);
    navigate("/");
  }

  return(
    <>
      <h1>Medical Bills</h1>
      <div className="row mb-3">
        <div className="col">
          <Link to="/add" className="btn btn-outline-primary">Add</Link>
        </div>
        <div className="col d-flex justify-content-end">
          { currentUser===null ? 
            <>
              <Link className="btn btn-outline-primary me-3" to="/signup">Sign up</Link>
              <Link className="btn btn-outline-primary" to="/login">Log in</Link>
            </>
            :
            <div className="d-flex align-items-center">
              <span className="me-4">Hello <span className="fw-light fst-italic">{currentUser}</span></span>
              <button className="btn btn-outline-primary" onClick={handleLogout}>Log out</button>
            </div>
          }
        </div>
      </div>
      
      <table className="table table-sm table-hover align-middle">
        <thead className="table-secondary">
          <tr>
            <th>Date of Service</th>
            <th>Hospital</th>
            <th>Patient</th>
            <th>Bill Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { billList.map((item, idx) =>
            <tr key={idx}>
              <td>{item.date}</td>
              <td>{item.hospital}</td>
              <td>{item.patient}</td>
              <td>${parseFloat(item.amount).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
              <td>
                <Link to={"/open/"+idx} className="btn btn-sm btn-link me-2 ps-0">Open</Link>
                { item.user===currentUser &&
                  <button className="btn btn-sm btn-link" onClick={() => handleDelete(item)}>Delete</button>
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Home;