import axios from "axios";
import {PRODUCTS_CREATE_REQUEST, 
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/products`, config);

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createProductAction =
  (name, description, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/create`,
        { name, description, quantity },
        config
      );

      dispatch({
        type: PRODUCTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_CREATE_FAIL,
        payload: message,
      });
    }
  };

