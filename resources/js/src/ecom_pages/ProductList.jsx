import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Dropdown, Spinner } from "react-bootstrap";
import { useCart } from "./CartContext";

const BASE_URL = "https://ecom-6ffz.onrender.com/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [sortType, setSortType] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const { cartItems, addToCart, updateQuantity } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${BASE_URL}/products`);
            const data = await res.json();
            setProducts(data.data || []);
        } catch (error) {
            console.error("❌ Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (type) => setSortType(type);

    const getCartQty = (productId) => {
        const item = cartItems.find((p) => p.id === productId);
        return item?.quantity || 0;
    };

    const filteredProducts = products
        .filter(
            (p) => categoryFilter === "all" || p.categories === categoryFilter
        )
        .sort((a, b) => {
            switch (sortType) {
                case "priceLow":
                    return a.price - b.price;
                case "priceHigh":
                    return b.price - a.price;
                case "nameAsc":
                    return a.name.localeCompare(b.name);
                case "nameDesc":
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

    return (
        <div className="container py-4">
            {/* Filter and Sort */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div className="d-flex flex-wrap gap-2">
                    {["all", "Electronics", "Cloths", "Fruits"].map((cat) => (
                        <Button
                            key={cat}
                            variant={
                                categoryFilter === cat
                                    ? "primary"
                                    : "outline-primary"
                            }
                            onClick={() => setCategoryFilter(cat)}
                            className="text-capitalize"
                        >
                            {cat === "all" ? "All" : cat}
                        </Button>
                    ))}
                </div>

                <Dropdown onSelect={handleSort}>
                    <Dropdown.Toggle variant="secondary">
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="priceLow">
                            Price: Low to High
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priceHigh">
                            Price: High to Low
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="nameAsc">
                            Name: A to Z
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="nameDesc">
                            Name: Z to A
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="">Reset</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Products */}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    <Row>
                        {filteredProducts.map((product) => {
                            const qty = getCartQty(product.id);
                            return (
                                <Col
                                    md={4}
                                    lg={3}
                                    sm={6}
                                    xs={12}
                                    key={product.id}
                                    className="mb-4"
                                >
                                    <Card className="shadow-sm h-100 border-0">
                                        {/* <Card.Img
                      variant="top"
                      src={
                        product.image?.startsWith('http')
                          ? product.image
                          : `${BASE_URL.replace('/api', '')}/${product.image}`
                      }
                      alt={product.name}
                      style={{ height: '180px', objectFit: 'cover' }}
                    /> */}
                                        <Card.Img
                                            variant="top"
                                            src={
                                                product.image?.startsWith(
                                                    "http"
                                                )
                                                    ? product.image
                                                    : `${BASE_URL.replace(
                                                          "/api",
                                                          ""
                                                      )}/${product.image}`
                                            }
                                            alt={product.name}
                                            className="product-img"
                                        />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="fw-semibold">
                                                {product.name}
                                            </Card.Title>
                                            <Card.Text className="text-primary fw-bold mb-2">
                                                ₹{product.price}
                                            </Card.Text>

                                            {qty === 0 ? (
                                                <Button
                                                    variant="primary"
                                                    className="mt-auto w-100"
                                                    onClick={() =>
                                                        addToCart(product)
                                                    }
                                                >
                                                    🛒 Add to Cart
                                                </Button>
                                            ) : (
                                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                                    <Button
                                                        variant="outline-danger"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product.id,
                                                                -1
                                                            )
                                                        }
                                                    >
                                                        −
                                                    </Button>
                                                    <span>{qty}</span>
                                                    <Button
                                                        variant="outline-success"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product.id,
                                                                1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>

                    {/* Empty Message */}
                    {filteredProducts.length === 0 && (
                        <div className="text-center text-muted py-5">
                            <h5>No products found in this category.</h5>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;
