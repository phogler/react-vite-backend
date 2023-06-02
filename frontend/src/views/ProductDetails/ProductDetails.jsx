import { NavLink, Navigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [isEditingPrice, setIsEditingPrice] = useState(false);

    const { token } = useContext(AuthContext);

    const { id } = useParams();

    const getSingleProduct = async () => {
        const res = await fetch(`http://localhost:7777/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const updatedProduct = {
            name: formData.get("name"),
            price: formData.get("price"),
            description: formData.get("description"),
        };

        const res = await fetch(`http://localhost:7777/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProduct),
        });

        console.log(await res.json());

        await getSingleProduct();
    };

    return !!token ? (
        <>
            <Navbar />
            <section className="product-details">
                <div className="content-container">
                    <NavLink className="back-button" to="/products">
                        Back To Products
                    </NavLink>
                    <div className="product-details-card">
                        <div className="product-details-info">
                            <div className="product-details-image">
                                <img src={product.imageURL} alt="" />
                            </div>
                            <div className="product-details-price">
                                <h1>{product.name}</h1>
                                <h2>{product.price}kr</h2>
                            </div>
                            <p className="product-details-description">{product.description}</p>
                        </div>
                        <form className="product-details-form" onSubmit={handleFormSubmit}>
                            <div className="input-fields">
                                <label htmlFor="Name">Name:</label>
                                <input type="text" name="name" placeholder={product.name} />
                            </div>
                            <div className="input-fields">
                                <label htmlFor="price">Price:</label>
                                <input type="text" name="price" placeholder={`${product.price}kr`} />
                            </div>
                            <div className="input-fields">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="30"
                                    rows="10"
                                    placeholder={product.description}
                                />
                            </div>
                            <button className="product-details-button" type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default ProductDetails;
