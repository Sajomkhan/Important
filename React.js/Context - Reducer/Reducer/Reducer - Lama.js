// -------------------------------src/App.jsx-------------------------------//

import Form from "./Form";
import "./form.css";

function App() {
  return (
    <Form />
  );
}
export default App;


// ----------------------------src/postActionTypes.js----------------------------//

export const ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
  };


// -------------------------------src/postReducer.js-------------------------------//

import { ACTION_TYPES } from "./postActionTypes";

export const INITIAL_STATE = {
  loading: false,
  post: {},
  error: false,
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        loading: true,
        error: false,
        post: {},
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {
        error: true,
        loading: false,
        post: {},
      };
    default:
      return state;
  }
};



// -------------------------------src/Post.jsx-------------------------------//

import { useReducer, useState } from "react";
import { ACTION_TYPES } from "./postActionTypes";
import { INITIAL_STATE, postReducer } from "./postReducer";

const Post = () => {

  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

  const handleFetch = () => {
    dispatch({ type: ACTION_TYPES.FETCH_START });
    fetch("")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPES.FETCH_ERROR });
      });
  };

  return (

    <div>
      <button onClick={handleFetch}>
        {state.loading ? "Wait..." : "Fetch the post"}
      </button>
      <p>{state.post?.title}</p>
      <span>{state.error && "Something went wrong!"}</span>
    </div>
  );
};

export default Post;



// -------------------------------src/formReducer.js-------------------------------//

export const INITIAL_STATE = {
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
  };
  
  export const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_TAG":
        return {
          ...state,
          tags: [...state.tags, action.payload],
        };
      case "REMOVE_TAG":
        return {
          ...state,
          tags: state.tags.filter((tag) => tag !== action.payload),
        };
      case "INCREASE":
        return {
          ...state,
          quantity: state.quantity + 1,
        };
      case "DECREASE":
        return { ...state, quantity: state.quantity - 1 };
      default:
        return state;
    }
  };

  
// -------------------------------src/Form.jsx-------------------------------//

import React, { useReducer, useRef, useState } from "react";
import { formReducer, INITIAL_STATE } from "./formReducer";

const Form = () => {

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
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
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Desc"
          onChange={handleChange}
          name="desc"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={handleChange}
          name="price"
        />
        <p>Category:</p>

        <select onChange={handleChange} name="category">
          <option value="sneakers">Sneakers</option>
          <option value="tshirts">T-shirts</option>
          <option value="jeans">Jeans</option>
        </select>

        <p>Tags:</p>

        <textarea
          ref={tagRef}
          placeholder="Seperate tags with commas..."
        ></textarea>

        <button onClick={handleTags} type="button">
          Add Tags
        </button>

        <div className="tags">
          {state.tags.map((tag) => (
            <small
              onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })}
              key={tag}
            >
              {tag}
            </small>
          ))}
        </div>

        <div className="quantity">
          <button onClick={() => dispatch({ type: "DECREASE" })} type="button">
            -
          </button>
          <span>Quantity ({state.quantity})</span>
          <button onClick={() => dispatch({ type: "INCREASE" })} type="button">
            +
          </button>
        </div>

      </form>
    </div>
  );
};

export default Form;


// -------------------------------src/App.jsx-------------------------------//
// -------------------------------src/App.jsx-------------------------------//