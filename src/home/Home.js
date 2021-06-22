import React from "react";
import "./Home.css";
import { Background } from "../asset/index";
import Product from "../product/Product";
import { data } from "../data/data";

const Home = () => {
  const [product, setProduct] = React.useState([]);
  React.useEffect(() => {
    setProduct(data);
  },[]);

  return (
    <div className="home">
      <div className="home_container">
        <img className="home_image" src={Background} />

        <div className="home_row">
          {product.map((item) => {
            return <Product key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
