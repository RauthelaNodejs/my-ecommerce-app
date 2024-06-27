'use client'
import React, { useState, useEffect } from "react";
import { ADMINAPI } from "../../../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegEdit } from "react-icons/fa";
import { Modal} from 'react-bootstrap';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [productId, setProductId] = useState('');
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

 const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesp, setProductDesp] = useState("");
 
  // Fetch product list
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

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Place order
  const placeOrder = () => {
    // Mock placing order by clearing the cart
    setCart([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000); // Reset order success message after 3 seconds
  };

  // Toggle edit mode for a product
  

  const toggleEdit = async (product) => {
    // Logic to handle editing the row

    console.log("Edit row:uuuuuu", product);
    setProductId(product.id)
    setProductTitle(product.title);
    setProductPrice(product.price)
    setProductDesp(product.description);
    setShowEdit(true);
     
    // For example, you might open a modal with a form to edit the row's details
  };
  // Update product details
  
  const handleEditChanges = async () => {
    const payload = {
      
        title : productTitle,
        description :productDesp,
        price:parseInt(productPrice)
   
       
      };
      console.log("iiiiiiiii",payload);

    try {
      await ADMINAPI({
        url: `https://dummyjson.com/products/${productId}`,
        method: "put",
        body: { ...payload },
      })
        .then((data) => {
          if (data) {
            setShowEdit(false)
            fetchProductList();
          
            return data;
          } else {
            // toast.error(data?.message);
          }
        })
        .catch((err) => {
          //   toast.error(err?.message);
        });
    } catch (error) {
      console.log(error, "errorooo");
    }
  };
  // Cancel editing
  

  return (
    <>
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9">
          <h1>Product List</h1>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card">
                <div className="card-body" style={{ position: 'relative' }}>
  <>
    <h5 className="card-title">{product.title}</h5>
    <p className="card-text">{product.description}</p>
    <p className="card-text">Price: ${product.price}</p>
    <button
      className="btn btn-primary mr-2"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>

    <FaRegEdit 
      style={{ position: 'absolute', top: '10px', right: '10px', color: 'secondary', fontSize: '20px', cursor: 'pointer' }} 
      onClick={() => toggleEdit(product)} 
    />
    {/* <button
      className="btn btn-secondary"
      onClick={() => toggleEdit(product)}
    >
      Edit
    </button> */}
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
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((product, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                  </div>
                </div>
              ))}
              <button className="btn btn-success" onClick={placeOrder}>
                Place Order
              </button>
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
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <div>
                <div className="d-flex align-items-center">
                  <div className="mx-2">
                    <h4>Product</h4>
                  </div>
                </div>


                <div className="row mt-3">
               

                  <div className="col-md-6">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" "
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      required
                    />{" "}  
                  </div>
                 
                  <div className="col-md-4">
                    <label htmlFor="">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" "
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      required
                    />{" "}  
                  </div>
                </div>
                <div className="row mt-3">
               

            
                 <label htmlFor="">Description</label>
                 <textarea
  className="form-control"
  placeholder="Enter product description..."
  value={productDesp}
  onChange={(e) => setProductDesp(e.target.value)}
  required
/>
              
              
               
             </div>

               
              </div>

              <div className="my-4 d-flex justify-content-between">
                <div>
                  <button
                    type="btn"
                    className="btn btn-outline-secondary"
                    onClick={handleCloseEdit}
                  >
                    {" "}
                    Close{" "}
                  </button>
                </div>
                <div>
                  <button
                    type="btn"
                    className="btn btn-outline-success"
                    onClick={handleEditChanges}
                  >
                    {" "}
                    Save Changes{" "}
                  </button>
                </div>
              </div>
            </>
          </Modal.Body>
        </Modal>
    </>
  );
};

export default Product;
