'use client';
import React, { useState, useEffect } from "react";
import { ADMINAPI } from "../../../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegEdit } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [productId, setProductId] = useState('');
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesp, setProductDesp] = useState("");

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const fetchProductList = async () => {
    try {
      const response = await ADMINAPI({
        url: `https://dummyjson.com/products`,
        method: "GET",
      });
      setProducts(response.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const addToCart = (product) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity -= 1;
    if (updatedCart[index].quantity === 0) {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const removeAllFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    setCart([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const toggleEdit = (product) => {
    setProductId(product.id);
    setProductTitle(product.title);
    setProductPrice(product.price);
    setProductDesp(product.description);
    setShowEdit(true);
  };

  const handleEditChanges = async () => {
    const payload = {
      title: productTitle,
      description: productDesp,
      price: parseInt(productPrice),
    };

    try {
      await ADMINAPI({
        url: `https://dummyjson.com/products/${productId}`,
        method: "PUT",
        body: { ...payload },
      });
      setShowEdit(false);
      fetchProductList();
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="container mt-0">
        <div className="row">
          <div className="col-md-9">
            <h3>Product List</h3>
            <hr />
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body" style={{ position: 'relative' }}>
                      <>
                        <h6 className="card-title" style={{ maxWidth: "250px" }}>{product.title} </h6>
                        <hr className="hr" />
                        <div className="d-flex justify-content-center">
                          <img src={product.images[0]} alt="" style={{ maxWidth: "200px", height: "100px" }} />
                        </div>
                        <hr />
                        <p className="card-text my-3">{product.description}</p>
                        <hr className="hr mt-2" />
                        <div className="d-flex align-items-baseline justify-content-between">
                          <button type="btn" className="btn btn-primary btn-sm">Price: ${product.price}</button>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                          <FaRegEdit
                            style={{ position: 'absolute', top: '10px', right: '10px', color: 'secondary', fontSize: '20px', cursor: 'pointer' }}
                            onClick={() => toggleEdit(product)}
                          />
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3">
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
              <>
              <div className="card">
                <div className="card-body" style={{border:"0"}}>
              <p>Your cart is empty.</p>
              <div className="d-flex justify-content-center">
                          <img src='./images/trolley.png' alt="" className="img-fluid" />
                        </div>
                        </div>
</div>
                        </>
              
            ) : (
              <div>
                {cart.map((product, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <div className="d-flex justify-content-center">
                          <img src={product.images[0]} alt="" style={{ maxWidth: "200px", height: "100px" }} />
                        </div>
                      <p>Quantity: {product.quantity}</p>
                      <button type="btn" className="btn btn-primary">Price: ${product.price}</button>
                      <div className="mt-3">
                        <button
                          className="btn btn-outline-secondary btn-sm mx-2"
                          onClick={() => removeFromCart(index)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm mx-2"
                          onClick={() => removeAllFromCart(index)}
                        >
                          Remove All
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm mx-2"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>
                      <MdDeleteForever
                        style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', fontSize: '20px', cursor: 'pointer' }}
                        onClick={() => removeAllFromCart(index)}
                      />
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Total: ${calculateTotalPrice().toFixed(2)}</h5>
                  <button className="btn btn-success" onClick={placeOrder}>
                    Place Order
                  </button>
                </div>
              </div>
            )}
            {orderSuccess && (
              <p className="alert alert-success mt-3">Order placed successfully!</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        size="lg"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton style={{ border: "0" }}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="d-flex align-items-center">
              <div className="mx-2">
                <h4>Product</h4>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="productTitle">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter product title"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter product price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label htmlFor="productDesp">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter product description"
                  value={productDesp}
                  onChange={(e) => setProductDesp(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="my-4 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCloseEdit}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleEditChanges}
            >
              Save Changes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
