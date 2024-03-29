//============ Example ============//
//============ Example ============//



//============ Example ============//
  // CUT OUT PASSWORD FORM USER
  const { password, ...others } = user._doc; 

  res.json(others);
  } catch (err) {
  console.log(err);
  }



//============ Example ============//
const [cartItems, setCartItems] = useState({});

const addToCart = (itemId) => {
  if (!cartItems[itemId]) {
    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  } else {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }
};

const removeFromCart = (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
};



//============ Example ============//
const [cartItems, setCartItems] = useState(0);
<div onClick={() => setCartItems((prev) => prev + 1)}>+</div>;
<div onClick={() => setCartItems((prev) => prev + 1)}>-</div>;



//============ Example ============//
import React, { useReducer, useRef, useState } from "react";

const Form = () => {

  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: 0,
    category: "",
    tags: [],
    images: {
      sm: "",
      md: "",
      lg: "",
    },
    quantity: 0,
  });

  const handleChange = (e) => {
   setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //or setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const tagRef = useRef();

  const handleTags = () => {
    const tags = tagRef.current.value.split(",");
    tags.forEach((tag) => {
      setProduct((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    });
  };

  const handleRemoveTag = (tag) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleIncrease = () => {
    setProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const handleDecrease = () => {
      setProduct((prev) => ({
        ...prev,
        quantity: prev.quantity - 1,
      }));
  };

  const handleTags = () => {
    const tags = tagRef.current.value.split(",");
    tags.forEach((tag) => {
      dispatch({ type: "ADD_TAG", payload: tag });
    });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="desc"
          onChange={handleChange}
          placeholder="Desc"
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
        />
        <p>Category:</p>
        <select name="category" id="category" onChange={handleChange}>
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea
          ref={tagRef}
          placeholder="Seperate tags with commas..."
        ></textarea>
        <button type="button" onClick={handleTags}>
          Add Tags
        </button>
        <div className="tags">
          {product.tags.map((tag) => (
            <small key={tag} onClick={() => handleRemoveTag(tag)}>
              {tag}
            </small>
          ))}
        </div>
        <div className="quantity">
          <button type="button" onClick={handleDecrease}>
            -
          </button>
          <span>Quantity ({product.quantity})</span>
          <button type="button" onClick={handleIncrease}>
            +
          </button>
        </div>
      </form>
    </div>
  
export default Form;
//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
