import { FETCH_PRODUCTS,FILTER_PRODUCTS_BY_SIZE,ORDER_PRODUCTS_BY_PRICE } from "../types"

const initialState = {
    products: [],
    count:0,
}

export const productsReducer = (state=initialState,action)=>{
    
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                products: action.payload,
                filteredItems: action.payload
            }
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items,
            } 
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items,   
            }
        default:
            return state;
    }
}