import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./Products.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Products = () => {
    const { token } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await fetch("http://localhost:7777/api/products");
        const data = await res.json();
        setProducts(data);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const newProduct = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            imageURL: formData.get("imageURL"),
        };

        const res = await fetch(`http://localhost:7777/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();

        await getProducts();
    };

    const handleRemoveProduct = async (productId) => {
        const res = await fetch(`http://localhost:7777/api/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        await getProducts();
    };

    return !!token ? (
        <>
            <Navbar />
            <section className="products">
                <div className="content-container products-grid">
                    <div className="product-create">
                        <form className="product-form" onSubmit={handleFormSubmit}>
                            <label htmlFor="name">
                                <h1>Create New Product</h1>
                            </label>
                            <div className="input-fields">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" placeholder="Lemon" />
                            </div>
                            <div className="input-fields">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="A Lemon"
                                />
                            </div>
                            <div className="input-fields">
                                <label htmlFor="price">Price:</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    placeholder="44"
                                    pattern="[0-9]*"
                                />
                            </div>
                            <div className="input-fields">
                                <label htmlFor="image">ImageURL:</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="imageURL"
                                    placeholder="https://picsum.photos/200/300"
                                />
                            </div>
                            <button className="product-button" type="submit">
                                Create Product
                            </button>
                        </form>
                    </div>
                    <div className="product-list">
                        {products &&
                            products.map((product) => {
                                return (
                                    <div className="product-card" key={product._id}>
                                        <div className="product-delete-button">
                                            <button onClick={() => handleRemoveProduct(product._id)}>
                                                X
                                            </button>
                                        </div>
                                        <Link to={`${product._id}`}>
                                            <div className="product-image">
                                                <img src={product.imageURL} alt="image of fruit" />
                                            </div>
                                            <div className="product-details">
                                                <p className="product-name">{product.name}</p>
                                                <p className="product-price">{product.price}kr</p>
                                                <p className="product-description">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </Link>
                                        <button className="product-details-button">
                                            <Link to={product._id}>Details</Link>
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default Products;
