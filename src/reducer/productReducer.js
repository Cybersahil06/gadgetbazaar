
const ProductReducer = (state, action)=>{
//     if(action.type === "SET_LOADING"){
//         return {
//             ...state,
//             isLoading:true,
//         };
//     }

//    if(action.type === "API_ERROR"){
//     return{
//         ...state,
//         isLoading:false,
//         isError:true,
//     };
//    }

  /* The `switch` statement is used to check the value of `action.type` and perform different actions
  based on its value. In this case, if `action.type` is equal to `"SET_LOADING"`, it will return a
  new state object with the `isLoading` property set to `true`. This is typically used to indicate
  that the application is currently loading data. */
  switch (action.type){
    case "SET_LOADING":
        return{
            ...state,
            isLoading:true,

        };
       
        case "SET_API_DATA":
            const featureData = action.payload.filter((curElem) => {
                return curElem.featured === true;
            });

            return {
                ...state,
                isLoading:false,
                products: action.payload,
                featureProducts:featureData,
            }
       case "API_ERROR":
        return{
                 ...state,
                 isLoading:false,
                 isError:true,
                };

        case "SET_SINGLE_LOADING":
         return {
                  ...state,
                  isSingleLoading: true,
                };
              
        case "SET_SINGLE_PRODUCT":
        return {
                 ...state,
                 isSingleLoading: false,
                 singleProduct: action.payload,
                };
              
                  case "SET_SINGLE_ERROR":
                    return {
                      ...state,
                      isSingleLoading: false,
                      isError: true,
                    };        

        default:
          return state;
  }


    // return state;
};

export default ProductReducer;
