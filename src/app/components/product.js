// components/Product.js
'use client';
import React, { useEffect, useState } from "react";
import { ADMINAPI } from "../../../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegEdit } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsSuccess, addToCart, removeFromCart, removeAllFromCart, placeOrder, toggleEdit, saveChanges } from '../../../store/actions/product';

const Product = () => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const orderSuccess = useSelector((state) => state.orderSuccess);
  const showEdit = useSelector((state) => state.showEdit);
  const editProduct = useSelector((state) => state.editProduct);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesp, setProductDesp] = useState("");

  const handleCloseEdit = () => dispatch(toggleEdit());

  const fetchProductList = async () => {
    setLoading(true);
    try {
      const response = await ADMINAPI({
        url: `https://dummyjson.com/products`,
        method: "GET",
      });
      dispatch(fetchProductsSuccess(response.products));
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleEditChanges = async () => {
    const payload = {
      id: editProduct.id,
      title: productTitle,
      description: productDesp,
      price: parseInt(productPrice),
    };

    try {
      await ADMINAPI({
        url: `https://dummyjson.com/products/${editProduct.id}`,
        method: "PUT",
        body: { ...payload },
      });
      dispatch(saveChanges(payload));
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
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" />
              </div>
            ) : (
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
                              onClick={() => dispatch(addToCart(product))}
                            >
                              Add to Cart
                            </button>
                            <FaRegEdit
                              style={{ position: 'absolute', top: '10px', right: '10px', color: 'secondary', fontSize: '20px', cursor: 'pointer' }}
                              onClick={() => {
                                setProductTitle(product.title);
                                setProductPrice(product.price);
                                setProductDesp(product.description);
                                dispatch(toggleEdit(product));
                              }}
                            />
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-3">
            <h1>Shopping Cart</h1>
            {cart.length === 0 ? (
              <div className="card">
                <div className="card-body" style={{ border: "0" }}>
                  <p>Your cart is empty.</p>
                  <div className="d-flex justify-content-center">
                    <img src='./images/trolley.png' alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
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
                          onClick={() => dispatch(removeFromCart(index))}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm mx-2"
                          onClick={() => dispatch(removeAllFromCart(index))}
                        >
                          Remove All
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm mx-2"
                          onClick={() => dispatch(addToCart(product))}
                        >
                          +
                        </button>
                      </div>
                      <MdDeleteForever
                        style={{ position: 'absolute', top: '10px', right: '10px', color: 'red', fontSize: '20px', cursor: 'pointer' }}
                        onClick={() => dispatch(removeAllFromCart(index))}
                      />
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Total: ${calculateTotalPrice().toFixed(2)}</h5>
                  <button className="btn btn-success" onClick={() => dispatch(placeOrder())}>
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
