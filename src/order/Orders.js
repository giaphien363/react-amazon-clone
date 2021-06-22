import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";

import { useStateValue } from "../provider/StateProvider";
import "./Orders.css";
import { db } from "../firebase";

const Orders = () => {
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) => {
          let array = [];
          snapShot.docs.map((doc) => {
            let id = doc.id;
            let data = doc.data();
            let temp = { id, data };
            array.push(temp);
            return temp;
          });

          setOrders(array);
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders_order">
        {orders.map((order, id) => {
          return <Order key={id} order={order} />;
        })}
      </div>
    </div>
  );
};

const Order = ({ order }) => {
  // console.log("from order:", order);
  const dateTime = new Date(order.data.created);

  return (
    <div>
      <div className="order">
        <h2>Order</h2>
        <p>{dateTime.toLocaleString()}</p>
        <p className="order_id">
          Id order :<small>{order.id}</small>
        </p>
        {order.data.cart.map((item, id) => {
          return <CheckoutProduct key={id} {...item} />;
        })}
        <div className="order_total">
          Orders Total: $ {parseInt(order.data.amount)/100}
        </div>
      </div>
    </div>
  );
};

const CheckoutProduct = ({ id, title, img, rating, price }) => {
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

export default Orders;
