'use client'
import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  
  


 
  
  return (
    <>
      <header>
        <div className="" >
        <div className="headerSection" style={{ backgroundColor: "lightgrey", borderRadius: "0px"  }}>
        <div className="d-flex align-items-center my-3">
              <div className="d-flex align-items-center mx-0" style={{cursor:"pointer"}}>
                <img src="./images/tripplehiphen.svg" alt="" />
                <input
                  type="text"
                  className="search-bar form-control"
                  placeholder="Search"
                  style={{ margin: "0px 10px", padding: "10px 150px 10px 10px", borderRadius: "25px", border: "1px solid lightGrey" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;