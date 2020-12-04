import actionTypes from './productActionTypes';

 const productListReducer = (state = { allProducts: [] }, action) => {
   switch (action.type) {
      case actionTypes.PRODUCT_LIST_REQUEST:
         return { loading: true, allProducts: [] };
      case actionTypes.PRODUCT_LIST_SUCCESS:
         return { loading: false, allProducts: action.payload };
      case actionTypes.PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export default productListReducer ;
