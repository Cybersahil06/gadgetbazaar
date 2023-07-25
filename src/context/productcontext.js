import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";


const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (/* In the code provided, `url` is a parameter that is passed to the
  `getProducts` and `getSingleProduct` functions. It represents the URL
  of the API endpoint from which the data is being fetched. The `url`
  parameter allows these functions to be reusable, so that they can fetch
  data from different API endpoints if needed. */
  url) => {
    /* `dispatch({ type: "SET_LOADING" });` is dispatching an action to the reducer function. In this
    case, it is dispatching an action of type "SET_LOADING". The reducer function will then handle
    this action and update the state accordingly. */
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
 
  // 2nd api  call for single product 
 
  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url);
      const SingleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", /* In the code provided, `payload` is used as a property
      in the action object passed to the reducer function. It
      is used to carry additional data or information related
      to the action being dispatched. In this case, `payload`
      is used to pass the fetched data from the API to the
      reducer function, so that it can be stored in the
      state. */
      payload: SingleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };
  

 /* The `useEffect` hook is used to perform side effects in functional components. In this case, it is
 used to fetch the products from the API when the component is mounted. */
  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };