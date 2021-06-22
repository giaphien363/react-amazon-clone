import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Banner } from "../asset";
import "./Checkout.css";
import StarIcon from "@material-ui/icons/Star";

// provider
import { useStateValue } from "../provider/StateProvider";

const Checkout = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();

  const [total, setTotal] = useState(0);

  const calculatorTotal = (array) => {
    const total = array.reduce((initial, item) => {
      initial += item.price;
      return initial;
    }, 0);
    return total;
  };

  useEffect(() => {
    if (!state.user) {
      history.push("/login");
    } else {
      setTotal(calculatorTotal(state.cart));
    }
  }, [state]);

  const deleteItem = (id) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: id,
    });
  };

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img src={Banner} alt="" className="checkout_ad" />
        <div className="checkout_title">
          <h3>hello, {state.user}</h3>
          <h2>Your shopping Cart</h2>
        </div>
        {/* CartItem */}
        {state.cart.map((item, id) => {
          return <CheckoutProduct key={id} {...item} deleteItem={deleteItem} />;
        })}
      </div>

      <div className="checkout_right">
        <Subtotal total={total} lengthCart={state.cart.length} />
      </div>
    </div>
  );
};

const Subtotal = ({ total, lengthCart }) => {
  const history = useHistory();

  return (
    <div className="subtotal">
      <p>
        Subtotal ({lengthCart} items): ${" "}
        <strong>{total.toLocaleString()}</strong>
      </p>
      <small className="subtotal_gift">
        <input type="checkbox" name="" id="" /> This order contains a gift
      </small>
      <button
        onClick={() => {
          history.push("/payment");
        }}
        // disabled={total == 0 ? true : false}
        className={total == 0 ? "disableBtn" : ""}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

const CheckoutProduct = ({ id, title, img, rating, price, deleteItem }) => {
  return (
    <div className="checkout_product">
      <img src={img} alt="" className="checkoutProduct_img" />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$ </small> <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {[...Array(rating).keys()].map((id) => {
            return (
              <p key={id}>
                <StarIcon style={{ color: "red" }} />
              </p>
            );
          })}
        </div>
        <button onClick={() => deleteItem(id)}>remove from cart</button>
      </div>
    </div>
  );
};

export default Checkout;
