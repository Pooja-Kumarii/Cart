import { useReducer } from "react";

// Initial products in cart
const initialState = [
  {
    id: 1,
    name: "Samsung Galaxy S8",
    price: 399.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/71GcQGGdpHL._AC_UY218_.jpg",
  },
  {
    id: 2,
    name: "Google Pixel",
    price: 499.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61U3tJvDtqL._AC_UY218_.jpg",
  },
  {
    id: 3,
    name: "Xiaomi Redmi Note 2",
    price: 699.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/61b3Y4hGPIL._AC_UY218_.jpg",
  },
  {
    id: 4,
    name: "Samsung Galaxy S7",
    price: 599.99,
    quantity: 1,
    image: "https://m.media-amazon.com/images/I/71tTHYoYQGL._AC_UY218_.jpg",
  },
];

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case "DECREASE":
      return state.map((item) =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "REMOVE":
      return state.filter((item) => item.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return state;
  }
};

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Total items count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>UseReducer</h1>
        <div className="cart-icon">
          🛒
          <span className="cart-count">{totalItems}</span>
        </div>
      </div>

      {/* Main */}
      <div className="container">
        <h2 className="page-title">YOUR BAG</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            🛒 Your cart is empty!
          </div>
        ) : (
          <>
            {/* Cart Items */}
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price}</p>
                  <button
                    className="btn-remove"
                    onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                  >
                    remove
                  </button>
                </div>

                {/* Quantity controls */}
                <div className="quantity-controls">
                  <button
                    className="btn-qty"
                    onClick={() => dispatch({ type: "INCREASE", id: item.id })}
                  >
                    ∧
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="btn-qty"
                    onClick={() => dispatch({ type: "DECREASE", id: item.id })}
                  >
                    ∨
                  </button>
                </div>
              </div>
            ))}

            <hr className="divider" />

            {/* Total */}
            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-amount">${totalPrice}</span>
            </div>

            {/* Clear Cart */}
            <button
              className="btn-clear"
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
