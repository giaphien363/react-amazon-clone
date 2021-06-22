import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
// payment use stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";
import Header from "./layout/Header";
import Home from "./home/Home";
import Checkout from "./checkout/Checkout";
import Login from "./login/Login";
import Payment from "./payment/Payment";
import Orders from "./order/Orders";

import { useStateValue } from "./provider/StateProvider";
import { auth } from "./firebase";

const promise = loadStripe(
  "pk_test_51J1ju6FvkgzTVA7am1fMCWOMRlbj4JSW7tl4LkmglUrYyayDkFiCO0YbCtfque6IIMBfATzCzoKaQhQ5yr5il8kP00hlvxSDbx"
);

function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("auth user", authUser);

      if (authUser) {
        // user logged in
        dispatch({ type: "SET_USER", payload: authUser.email.split("@")[0] });
      } else {
        // user log out
        dispatch({ type: "SET_USER", payload: null });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>

          <Route path="/checkout" exact>
            <Header />
            <Checkout />
          </Route>

          <Route path="/orders" exact>
            <Header />
            <Orders />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/payment" exact>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="*" children={<PageNotFound />} />
        </Switch>
      </div>
    </Router>
  );
}

const PageNotFound = () => {
  return (
    <div style={{ margin: "30px 40px" }}>
      <h1>Page not found !</h1>
    </div>
  );
};

export default App;
