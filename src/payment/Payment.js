import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

// import css
import "./payment.css";
// provider
import { useStateValue } from "../provider/StateProvider";
import axios from "../axios";
import { db } from "../firebase";

const Payment = () => {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const [total, setTotal] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [clientSecret, setClientSecret] = useState(true);

  //generate the special stripe secret which allows us to charge a customer
  const getClientSecret = async () => {
    const response = await axios({
      method: "post",
      url: `/payment/create?total=${calculatorTotal(state.cart) * 100}`,
    });
    setClientSecret(response.data.clientSecret);
  };

  useEffect(() => {
    setTotal(calculatorTotal(state.cart));

    getClientSecret();

    // console.log("db:>>>", db);
  }, []);

  const calculatorTotal = (array) => {
    return array.reduce((initial, item) => {
      return initial + item.price;
    }, 0);
  };

  const handleSubmit = async (e) => {
    // do all fancy stripe
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(state.user)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            cart: state.cart,
            amount: paymentIntent.amount,
            created: new Date().getTime(),
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //
        dispatch({
          type: "EMPTY_CART",
        });
        // console.log("succeed", succeeded);
        history.replace("/orders");
      });
  };
  const handleChange = (e) => {
    // listen for changes in the cardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Check Out (<Link to="/checkout">{state.cart.length} items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment_address">
            <p>{state.user}</p>
            <p>122, Ha long</p>
            <p>Quang Ninh, VN</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_item">
            {state.cart.map((item, index) => {
              return <CheckOutItems key={index} {...item} />;
            })}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment method</h3>
          </div>
          <div className="payment_detail">
            {/* stripe magic will go */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <h3>
                  Orders total ({state.cart.length} items): $
                  <strong>{total.toLocaleString()}</strong>
                </h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckOutItems = ({ id, title, img, rating, price }) => {
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
      </div>
    </div>
  );
};

export default Payment;
