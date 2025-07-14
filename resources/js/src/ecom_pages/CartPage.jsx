import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const BASE_URL = "https://ecom-6ffz.onrender.com";
// 🧁 Helper: Read cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userId = localStorage.getItem("user_id") || 1;
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/cart/${userId}`, {
                credentials: "include",
            });
            const data = await res.json();
            setCart(data.cart || []);
        } catch (err) {
            console.error("❌ Cart fetch error:", err);
            setError("Failed to load cart items.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (cartItemId, change) => {
        const item = cart.find((i) => i.id === cartItemId);
        if (!item) return;

        const newQty = item.quantity + change;

        // Remove if quantity < 1
        if (newQty < 1) {
            await removeItem(cartItemId);
            return;
        }

        try {
            await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
                credentials: "include",
            });

            const token = decodeURIComponent(getCookie("XSRF-TOKEN"));
            const res = await fetch(
                `${BASE_URL}/api/cart/update/${cartItemId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": token,
                    },
                    body: JSON.stringify({ quantity: newQty }),
                }
            );

            if (res.ok) {
                setCart((prev) =>
                    prev.map((i) =>
                        i.id === cartItemId ? { ...i, quantity: newQty } : i
                    )
                );
            } else {
                const data = await res.json();
                console.error("❌ Quantity update failed:", data.message);
            }
        } catch (err) {
            console.error("❌ Quantity update error:", err);
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
                credentials: "include",
            });

            const token = decodeURIComponent(getCookie("XSRF-TOKEN"));

            const res = await fetch(
                `${BASE_URL}/api/cart/remove/${cartItemId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "X-XSRF-TOKEN": token,
                    },
                }
            );

            if (res.ok) {
                setCart((prev) => prev.filter((i) => i.id !== cartItemId));
            } else {
                const data = await res.json();
                console.error("❌ Remove error:", data.message);
            }
        } catch (err) {
            console.error("❌ Remove error:", err);
        }
    };

    const handleCheckout = async () => {
        try {
            await fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
                credentials: "include",
            });

            const token = decodeURIComponent(getCookie("XSRF-TOKEN"));
            const res = await fetch(`${BASE_URL}/api/checkout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": token,
                },
                body: JSON.stringify({ user_id: userId }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(
                    "✅ Order placed successfully! Order ID: " + data.order_id
                );
                setCart([]);
                clearCart(); // Clear global cart
            } else {
                alert("❌ " + data.message);
            }
        } catch (err) {
            console.error("❌ Checkout error:", err);
            alert("Something went wrong during checkout.");
        }
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => {
            const price = item?.product?.price || 0;
            return sum + price * item.quantity;
        }, 0);
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-2">🛒 Your Cart</h4>

                <Button
                    variant="secondary"
                    onClick={() => navigate("/product")}
                >
                    ← Back to Products
                </Button>
            </div>
            {loading ? (
                <div className="text-muted">
                    <Spinner animation="border" /> Loading cart...
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : cart.length === 0 ? (
                <div className="text-muted">Your cart is empty.</div>
            ) : (
                <>
                    <ul className="list-group mb-3">
                        {cart.map((item) => (
                            <li
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div style={{ flex: 1 }}>
                                    <strong>
                                        {item.product?.name ||
                                            "Unnamed Product"}
                                    </strong>
                                    <div className="text-muted small">
                                        ₹{item.product?.price || 0}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() =>
                                            updateQuantity(item.id, -1)
                                        }
                                    >
                                        -
                                    </Button>
                                    <span className="mx-2">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() =>
                                            updateQuantity(item.id, 1)
                                        }
                                    >
                                        +
                                    </Button>
                                </div>

                                <span className="fw-bold mx-3">
                                    ₹
                                    {(item.product?.price || 0) * item.quantity}
                                </span>

                                <Button
                                    variant="outline-dark"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                >
                                    ✕
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Total: ₹{calculateTotal()}</h5>
                        <Button variant="success" onClick={handleCheckout}>
                            ✅ Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
