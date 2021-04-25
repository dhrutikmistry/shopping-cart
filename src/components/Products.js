import React, { Component } from "react";
import formatCurrency from "../util";
import { connect } from "react-redux";
import {fetchProducts} from "../actions/productActions";
import { addToCart } from '../actions/cartActions';


class Products extends Component {
 
  componentDidMount() {
    console.log("Inside component")
    this.props.fetchProducts();
    
  }
  render() {
        
        return(
            <div>
            {!this.props.products ? (
            <div>Loading...</div>
            ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                    
                    >
                      <img src={product.image} alt={product.title}></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        onClick={() => this.props.addToCart(product)}
                        className="button primary"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}  
     </div>
        )   
  }

}


const mapStateToProps = (state) =>{
    return {
       products: state.products.filteredItems
    };
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        addToCart: (product) => dispatch(addToCart(product))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);