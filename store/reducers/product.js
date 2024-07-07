// redux/reducers.js
import {
    FETCH_PRODUCTS_SUCCESS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    PLACE_ORDER,
    TOGGLE_EDIT,
    SAVE_CHANGES
  } from './../actions/actionType';
  
  const initialState = {
    products: [],
    cart: [],
    orderSuccess: false,
    showEdit: false,
    editProduct: {
      id: '',
      title: '',
      price: '',
      description: ''
    }
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload
        };
      case ADD_TO_CART:
        const index = state.cart.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          const updatedCart = [...state.cart];
          updatedCart[index].quantity += 1;
          return { ...state, cart: updatedCart };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }]
          };
        }
      case REMOVE_FROM_CART:
        const updatedCart = [...state.cart];
        updatedCart[action.payload].quantity -= 1;
        if (updatedCart[action.payload].quantity === 0) {
          updatedCart.splice(action.payload, 1);
        }
        return { ...state, cart: updatedCart };
      case REMOVE_ALL_FROM_CART:
        const cartAfterRemoval = [...state.cart];
        cartAfterRemoval.splice(action.payload, 1);
        return { ...state, cart: cartAfterRemoval };
      case PLACE_ORDER:
        return { ...state, cart: [], orderSuccess: true };
      case TOGGLE_EDIT:
        return {
          ...state,
          showEdit: !state.showEdit,
          editProduct: action.payload || initialState.editProduct
        };
      case SAVE_CHANGES:
        const updatedProducts = state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
        return {
          ...state,
          products: updatedProducts,
          showEdit: false
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  