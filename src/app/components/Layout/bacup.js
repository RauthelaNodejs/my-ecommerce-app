import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { ADMINAPI } from "../../../apiWrapper";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import storage from "../../../comman/localstorage";
import Dropdown from "react-bootstrap/Dropdown";
import { validateEmail,isValid } from "../../../comman/helper";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();
  const [apiErrors, setApiErrors] = useState({ message: "", response: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlelogOuClose = () => setShowLogout(false);
  const handleLogOutShow = () => setShowLogout(true);

  const handleLogin1 = async () => {
    // Simulate login validation
    if (email === "admin@example.com" && password === "password") {
      // Save user information in local storage
      localStorage.setItem("user", JSON.stringify({ email }));
      alert("Login successful!");
      handleClose();
    } else {
      alert("Invalid email or password");
    }
  };
  const validateAll = () => {
    let err1 = {};
    err1.email = validateEmail(email);
    return err1;
  };


  const handleLogin = async (e) => {
    console.log(e.target,"HHHH",email,">>>",password);
    let vsl = validateEmail(email);
    console.log(vsl,"KKKKKKKK");
    e.preventDefault();
    try {
      let payload = {
          "email": email ,//"admin.insight@yopmail.com",
          "loginType":"SUPERADMIN",
          "password":password , //"Admin@123"
      }
      let err = validateAll();
console.log(err,"llllll",isValid(err));
      if (isValid(err)) {
        await ADMINAPI({
          url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}:3001/api/v1/users/login`,
          method: "POST",
          body: { ...payload },
        }).then((data) => {
          let userData = data.data;
          if (userData.status) {
            console.log(userData, "respnse data",data?.message);
            toast.success(data?.message);
            localStorage.clear();
            storage().set("token", userData.token);
            storage().set("roleId", userData.roleId);
            storage().set("userData", JSON.stringify(userData));
            handleClose();
     
            setTimeout(() => {
              navigate.push("/dashboard", { scroll: false });
            }, 100);
          } else {
            toast.error(data?.message);
          }
        });
      }else{
        setApiErrors({ message: err });
      }
    } catch (error) {
      console.log(error, "errorooo");
      setApiErrors({ message: error });
      toast.error(error);
    }
  }; 
  let userDataDummy = (storage().get("userData"));
  let userData = {}
  if(userDataDummy){
    userData = JSON.parse(userDataDummy)
  }
let nameValue = userData.userName ? userData.userName  : "Name Admin";
  console.log(userData,"TTTTTTToo");
let token = storage().get("token")

const handleLogOut = (e) => {
  localStorage.clear();

  handleLogOutShow();
  navigate.push("/")
};
  return (
    <div>
      <header>
        <div className="container-fluid">
          <div className="headerSection">
            <div className="d-flex align-items-center my-3">
              <div><img src="./logo.png" alt="" /></div>
              <div className="d-flex align-items-center mx-5">
                <svg width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#000000" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
                </svg>
                <input
                  type="text"
                  className="search-bar form-control"
                  placeholder="Search"
                  style={{ margin: "0px 10px", padding: "10px 150px 10px 10px", borderRadius: "25px", border: "1px solid lightGrey" }}
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div></div>
              <div className="d-flex align-items-center">
                <div>
                  <svg width="40" height="40" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0277 5C7.73472 5 5.80843 6.72411 5.55522 9.00306L4.5 18.5H1.5C0.671573 18.5 0 19.1716 0 20V21.5C0 22.3284 0.671573 23 1.5 23H22.5C23.3284 23 24 22.3284 24 21.5V20C24 19.1716 23.3284 18.5 22.5 18.5H19.5L18.4448 9.00306C18.1916 6.72411 16.2653 5 13.9723 5H10.0277Z" fill="#4880FF"/>
                    <rect opacity="0.3" x="9" y="24.5" width="6" height="6" rx="2.25" fill="#FF0000"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M21 16C25.4183 16 29 12.4183 29 8C29 3.58172 25.4183 0 21 0C16.5817 0 13 3.58172 13 8C13 12.4183 16.5817 16 21 16Z" fill="#F93C65"/>
                    <path d="M21.128 6.576C21.624 6.576 22.068 6.692 22.46 6.924C22.852 7.148 23.156 7.468 23.372 7.884C23.596 8.292 23.708 8.76 23.708 9.288C23.708 9.832 23.588 10.32 23.348 10.752C23.108 11.176 22.772 11.508 22.34 11.748C21.908 11.988 21.42 12.108 20.876 12.108C19.804 12.108 18.976 11.748 18.392 11.028C17.816 10.3 17.528 9.264 17.528 7.92C17.528 6.992 17.664 6.192 17.936 5.52C18.216 4.84 18.616 4.324 19.136 3.972C19.656 3.612 20.272 3.432 20.984 3.432C21.488 3.432 21.98 3.52 22.46 3.696C22.94 3.864 23.356 4.104 23.708 4.416L23.192 5.544C22.448 4.96 21.732 4.668 21.044 4.668C20.428 4.668 19.948 4.932 19.604 5.46C19.26 5.98 19.08 6.736 19.064 7.728C19.248 7.368 19.524 7.088 19.892 6.888C20.26 6.68 20.672 6.576 21.128 6.576ZM20.804 10.884C21.244 10.884 21.592 10.744 21.848 10.464C22.112 10.184 22.244 9.808 22.244 9.336C22.244 8.872 22.112 8.5 21.848 8.22C21.584 7.94 21.232 7.8 20.792 7.8C20.352 7.8 19.992 7.944 19.712 8.232C19.44 8.512 19.304 8.88 19.304 9.336C19.304 9.8 19.44 10.176 19.712 10.464C19.992 10.744 20.356 10.884 20.804 10.884Z" fill="white"/>
                  </svg>
                </div>
                <div className="d-flex align-items-center mx-3">
                  <img src="./flag.png" width={40} height={40} alt="Language" />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="mx-1">
                    <span>English</span> <img src="./dropdown.png" alt="dropdown" width={10} height={10} style={{ marginLeft: "5px" }} />
                  </div>
                </div>
                {
       token ?(<>
        {/* <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={handleShow}>
                  <img src="./profileImg.png" alt="profile" width={40} height={40} />
                  <div className="mx-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span>{nameValue}</span>
                  </div>
                </div> */}
                <li>
                          <Dropdown className="userLogin">
                            <Dropdown.Toggle
                              variant=""
                              id="dropdown-basic"
                              style={{ textTransform: "uppercase" }}
                            >
                              {nameValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="userLoginsection">
                            <Dropdown.Item onClick={handleLogOut}>
                                <img
                                  src="/images/sign out.svg"
                                  alt=""
                                  className="mx-2"
                                />{" "}
                                Sign Out
                              </Dropdown.Item>
                             
                              {/* <Dropdown.Item href="#">
                             < Link href={"/myscheduler"}>
                                  <img
                                    src="/images/schedules.svg"
                                    alt=""
                                    className="mx-2"
                                  />{" "}
                                   My Schedule
                                </Link>

                              </Dropdown.Item>
                              <hr /> */}
                              
                            </Dropdown.Menu>
                          </Dropdown>
                        </li>
       </>):(<>  <div className="my-3">
                      <button
                        type="button"
                        className="btn btn-success customeLogin"
                        style={{ width: "100%" }}
                        onClick={handleShow}
                      >
                        Login <img src="/images/arrow-right.png" alt="" />
                      </button>
                    </div> </>)
                }
                
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton style={{ border: "0" }}>
          </Modal.Header>
          <Modal.Body className="loginSection">
            <div>
              <div>
                <h1>Login</h1>
                <h6 className="mt-3 loginSection_EnterEmail">Enter Your Email & Password</h6>
              </div>
              <div className="my-3">
                <div className="text-field w100p">
                  <input
                    className="text-base w100p"
                    type="email"
                    required
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>E-Mail *</span>
                  {console.log(apiErrors,"llll")}
                 

                </div>
                {apiErrors.message && apiErrors.message.email && (
  <span
    className="text-danger mb-2 d-block"
    style={{ fontSize: "14px" }}
  >
    {apiErrors.message.email}
  </span>
)}
                <div className="text-field w100p">
                  <input
                    className="text-base w100p"
                    type="password"
                    required
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span>Password *</span>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div>
                    <h6>Forgot Password</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="my-3">
                      <button
                        type="button"
                        className="btn btn-success customeLogin"
                        style={{ width: "100%" }}
                        onClick={handleLogin}
                      >
                        Login <img src="/images/arrow-right.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="text-center">
                      <span className="loginWith_Section">or login with</span>
                    </div>
                    <div className="d-flex justify-content-evenly mt-3">
                      <button type="button" className="btn btn-outline-primary p-1 mx-3"><img src="/images/icons8-microsoft-365.svg" alt="" /></button>
                      <button type="button" className="btn btn-outline-primary p-1"><img src="/images/icons8-google.svg" alt="" /></button>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div></div>
                  <div>
                    <button type="button" className="btn btn-outline-success">Create Account</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showLogout} onHide={handlelogOuClose} backdrop="static" centered>
          <Modal.Header closeButton style={{ border: "0" }}>
          </Modal.Header>
          <Modal.Body className="loginSection">
            <div>
              <div className="my-3">
                <div className="row my-3">
                  <div className="col-md-12">
                    <h1>Are you sure want to logout </h1>
                    <div className="d-flex justify-content-evenly mt-3">
                      <button type="button" className="btn btn-outline-primary p-1 mx-3" onClick={handleLogOut}> Yes</button>
                      <button type="button" className="btn btn-outline-primary p-1" onClick={handlelogOuClose}> No</button>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <div></div>
                
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </header>
    </div>
  );
};

export default Header;