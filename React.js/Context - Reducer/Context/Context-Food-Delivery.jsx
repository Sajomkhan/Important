
//=============== main.jsx =================//
import FoodsProvider from "./context/FoodsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <FoodsProvider>
        <App />
      </FoodsProvider>
  </React.StrictMode>
);

//=============== context/FoodsContext.jsx =================//
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const FoodsContext = createContext(null);

const FoodsProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
  }

  useEffect(()=>{
    console.log(cartItems);
  },[cartItems])
  
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <FoodsContext.Provider value={contextValue}>
      {props.children}
    </FoodsContext.Provider>
  );
};

export default FoodsProvider;


//================ components/FoodItems.jsx ===============//
import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { FoodsContext } from "../../context/FoodsContext";

function FoodItem({ id, name, description, price, image }) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
  } = useContext(FoodsContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-tiem-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
