import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import "./Header.css";
import { useStateValue } from "../provider/StateProvider";
import { auth } from "../firebase";

const Header = () => {
  const [state, dispatch] = useStateValue();
  const lengthCart = state.cart.length;
  const history = useHistory();

  const signOut = () => {
    if (state.user) {
      auth.signOut();
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <div className="header_searchIcon">
          <SearchIcon />
        </div>
      </div>
      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionLineOne">
            hello {state.user ? state.user : "Guest"}
          </span>
          <span className="header_optionLineTwo" onClick={signOut}>
            {state.user ? "Sign Out" : "Sign In"}
          </span>
        </div>
        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">return </span>
            <span className="header_optionLineTwo"> &orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne">your </span>
          <span className="header_optionLineTwo">prime</span>
        </div>

        <div className="header_optionCart">
          <Link to="/checkout">
            <ShoppingCartIcon style={{ color: "white" }} />
          </Link>
          <span className="header_optionLineTwo header_cartCount">
            {lengthCart}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
