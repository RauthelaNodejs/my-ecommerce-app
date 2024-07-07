// redux/actions.js
import {
  FETCH_PRODUCTS_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  PLACE_ORDER,
  TOGGLE_EDIT,
  SAVE_CHANGES
} from './actionType';

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index
});

export const removeAllFromCart = (index) => ({
  type: REMOVE_ALL_FROM_CART,
  payload: index
});

export const placeOrder = () => ({
  type: PLACE_ORDER
});

export const toggleEdit = (product) => ({
  type: TOGGLE_EDIT,
  payload: product
});

export const saveChanges = (product) => ({
  type: SAVE_CHANGES,
  payload: product
});
