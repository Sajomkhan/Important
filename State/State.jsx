//============ Example-1 ============//
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

//============ Example-1 ============//
const [cartItems, setCartItems] = useState(0);
<div onClick={() => setCartItems((prev) => prev + 1)}>+</div>;
<div onClick={() => setCartItems((prev) => prev + 1)}>-</div>;

//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
//============ Example-1 ============//
