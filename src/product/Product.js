import React from "react";
import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";

import "./Product.css";
import { useStateValue } from "../provider/StateProvider";

const Product = ({ id, title, img, rating, price }) => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  const addToCart = () => {
    if (state.user) {
      dispatch({
        type: "ADD_TO_CART",
        payload: { id, title, img, rating, price },
      });
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$ </small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {[...Array(rating).keys()].map((id) => {
            return (
              <p key={id}>
                <StarIcon style={{ color: "red" }} />
              </p>
            );
          })}
        </div>
      </div>
      <img src={img} alt={title} />
      <div className="product_button">
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
