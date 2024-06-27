import React from 'react';

const Order = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div className='d-flex align-items-center justify-content-center' style={{marginTop:"200px", marginBottom:"200px"}}>
        <div className='d-flex justify-content-center' style={{maxWidth:"200px", margin:"0 auto"}}>
        <p>Work in progress...</p>
        <img src='./images/spinner-solid.svg' alt='' />
        </div>
      </div>
      {/* You can add more functionality here later */}
    </div>
  );
};

export default Order;
