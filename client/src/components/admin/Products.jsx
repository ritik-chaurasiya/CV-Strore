import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../services/productService";
import { FaSearch } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

function Products() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    const [image, setImage] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    //   useEffect(() => {
    //     fetchProducts();
    //   }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts(
                keyword,
                category
            );
            console.log("API Response:", data);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [keyword, category]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
        });

        setImage(null);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await updateProduct(editingId, form);

                toast.success("Product Updated Successfully");
            } else {
                const formData = new FormData();

                formData.append("name", form.name);
                formData.append("description", form.description);
                formData.append("price", form.price);
                formData.append("category", form.category);
                formData.append("stock", form.stock);
                formData.append("image", image);

                await createProduct(formData);

                toast.success("Product Created Successfully");
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);

        setForm({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await deleteProduct(id);

            toast.success("Product Deleted Successfully");

            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="container-fluid">

            {/* Header */}

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "20px",
                    background:
                        "linear-gradient(135deg,#210944,#08264c)",
                }}
            >
                <div className="card-body text-white d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <h2 className="fw-bold mb-1">
                            Product Management
                        </h2>

                        <p className="mb-0 opacity-75">
                            Manage your products efficiently
                        </p>
                    </div>

                    <div className="mt-3 mt-md-0">
                        <span className="badge bg-light text-dark fs-6">
                            Total Products: {products.length}
                        </span>
                    </div>
                </div>
            </div>


            <div className="row g-4">

                {/* Product Form */}

                <div className="col-12 col-lg-4">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px",
                        }}
                    >
                        <div
                            className="card-header text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#210944,#08264c)",
                            }}
                        >
                            <h5 className="m-0 fw-bold">
                                {editingId
                                    ? "Update Product"
                                    : "Create Product"}
                            </h5>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter Product Name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        name="description"
                                        className="form-control"
                                        placeholder="Enter Description"
                                        value={form.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Enter Price"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        placeholder="Enter Category"
                                        value={form.category}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        className="form-control"
                                        placeholder="Enter Stock"
                                        value={form.stock}
                                        onChange={handleChange}
                                    />
                                </div>

                                {!editingId && (
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Product Image
                                        </label>

                                        <input
                                            type="file"
                                            className="form-control"
                                            onChange={(e) =>
                                                setImage(
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn text-white w-100 fw-bold"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#210944,#08264c)",
                                    }}
                                >
                                    {editingId
                                        ? "Update Product"
                                        : "Create Product"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary w-100 mt-2"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>
                                )}

                            </form>

                        </div>
                    </div>

                </div>

                {/* Search + Category Filter UI */}

                <div className="col-12 col-lg-8">
                    <div
                        className="card border-0 shadow-sm mb-4"
                        style={{
                            borderRadius: "15px",
                        }}
                    >
                        <div className="card-body">

                            <div className="row g-3">

                                {/* Search */}

                                <div className="col-12 col-lg-8">

                                    <div className="input-group">

                                        <span
                                            className="input-group-text text-white"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg,#210944,#08264c)",
                                                border: "none",
                                                minWidth: "50px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <FaSearch />
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search products..."
                                            value={keyword}
                                            onChange={(e) =>
                                                setKeyword(e.target.value)
                                            }
                                        />

                                    </div>

                                </div>

                                {/* Category */}

                                <div className="col-12 col-lg-4">

                                    <div className="input-group">

                                        <span
                                            className="input-group-text text-white"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg,#210944,#08264c)",
                                                border: "none",
                                                minWidth: "50px",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <BiCategory />
                                        </span>

                                        <select
                                            className="form-select"
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                        >
                                            <option value="">
                                                All Categories
                                            </option>

                                            <option value="Electronics">
                                                Electronics
                                            </option>

                                            <option value="Mobiles">
                                                Mobiles
                                            </option>

                                            <option value="Fashion">
                                                Fashion
                                            </option>

                                            <option value="Beauty">
                                                Beauty
                                            </option>

                                            <option value="Home">
                                                Home
                                            </option>

                                            <option value="Books">
                                                Books
                                            </option>

                                            <option value="Sports">
                                                Sports
                                            </option>

                                            <option value="Gaming">
                                                Gaming
                                            </option>

                                            <option value="Shoes">
                                                Shoes
                                            </option>

                                            <option value="Watches">
                                                Watches
                                            </option>

                                            <option value="Accessories">
                                                Accessories
                                            </option>

                                            <option value="Groceries">
                                                Groceries
                                            </option>

                                        </select>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Product Table */}

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px",
                        }}
                    >

                        <div
                            className="card-header text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#210944,#08264c)",
                            }}
                        >
                            <h5 className="m-0 fw-bold">
                                Products List
                            </h5>
                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Category</th>
                                            <th>Stock</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {products.map((product) => (

                                            <tr key={product._id}>

                                                <td>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        width="60"
                                                        height="60"
                                                        style={{
                                                            objectFit:
                                                                "cover",
                                                            borderRadius:
                                                                "12px",
                                                        }}
                                                    />
                                                </td>

                                                <td className="fw-semibold">
                                                    {product.name}
                                                </td>

                                                <td>
                                                    ₹{product.price}
                                                </td>

                                                <td>
                                                    {product.category}
                                                </td>

                                                <td>
                                                    {/* <span
                                                        className={`badge ${product.stock >
                                                            0
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                            } `}
                                                    >
                                                        {
                                                            product.stock
                                                        }
                                                    </span> */}
                                                    <td>
                                                        {product.stock > 0 ? (
                                                            <span className="badge bg-success">
                                                                {product.stock}
                                                            </span>
                                                        ) : (
                                                            <span className="badge bg-danger">
                                                                Out Of Stock
                                                            </span>
                                                        )}
                                                    </td>
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-sm text-white me-2 m-1"
                                                        style={{
                                                            background:
                                                                "#210944",
                                                        }}
                                                        onClick={() =>
                                                            handleEdit(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                product._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
