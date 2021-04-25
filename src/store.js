import {createStore,compose,applyMiddleware,combineReducers} from 'redux'; 
import thunk from 'redux-thunk';
//import {shopReducer}  from './reducers/shopReducer';
import {productsReducer} from './reducers/productsReducer';
import {cartReducer} from './reducers/cartReducer';
import {orderReducer} from './reducers/orderReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    products: productsReducer,
    cart:cartReducer,
    order:orderReducer,
    }),composeEnhancer(applyMiddleware(thunk)));

export default store;