import productdetailActionTypes from './productdetailActionTypes';

const productdetailReducer = (state = { product: [] }, action) => {
   switch (action.type) {
      case productdetailActionTypes.PRODUCT_DETAIL_REQUEST:
         return {
            loading: true,
            ...state,
         };
      case productdetailActionTypes.PRODUCT_DETAIL_SUCCESS:
         return {
            loading: false,
            product: action.payload,
         };
      case productdetailActionTypes.PRODUCT_DETAIL_FAIL:
         return {
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default productdetailReducer;