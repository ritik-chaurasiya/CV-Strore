// import {
//     FaLaptop,
//     FaMobileAlt,
//     FaTshirt,
//     FaBook,
//     FaGamepad,
//     FaShoePrints,
//     FaClock,
//     FaHeadphones,
//     FaShoppingBasket,
//     FaHome,
//     FaFootballBall,
//     FaHeart,
// } from "react-icons/fa";

// function Categories() {
//     const categories = [
//         { name: "Electronics", icon: <FaLaptop size={32} /> },
//         { name: "Mobiles", icon: <FaMobileAlt size={32} /> },
//         { name: "Fashion", icon: <FaTshirt size={32} /> },
//         { name: "Beauty", icon: <FaHeart size={32} /> },
//         { name: "Home", icon: <FaHome size={32} /> },
//         { name: "Books", icon: <FaBook size={32} /> },
//         { name: "Sports", icon: <FaFootballBall size={32} /> },
//         { name: "Gaming", icon: <FaGamepad size={32} /> },
//         { name: "Shoes", icon: <FaShoePrints size={32} /> },
//         { name: "Watches", icon: <FaClock size={32} /> },
//         { name: "Accessories", icon: <FaHeadphones size={32} /> },
//         { name: "Groceries", icon: <FaShoppingBasket size={32} /> },
//     ];

//     return (
//         <section className="bg-white shadow-sm py-3">
//             <div className="container-fluid">
//                 <div className="text-center my-3">
//                     <h2
//                         className="fw-bold"
//                         style={{
//                             color: "#210944",
//                         }}
//                     >
//                         Shop By Category
//                     </h2>

//                 </div>

//                 <div
//                     className="d-flex justify-content-lg-center gap-4 overflow-auto"
//                     style={{
//                         scrollbarWidth: "none",
//                         msOverflowStyle: "none",
//                         whiteSpace: "nowrap",
//                     }}
//                 >
//                     {categories.map((category, index) => (
//                         <div
//                             key={index}
//                             className="text-center"
//                             style={{
//                                 minWidth: "90px",
//                                 cursor: "pointer",
//                             }}
//                         >
//                             <div
//                                 className="d-flex justify-content-center align-items-center mx-auto rounded-circle"
//                                 style={{
//                                     width: "70px",
//                                     height: "70px",
//                                     background: "#f8f9fa",
//                                     color: "#210944",
//                                 }}
//                             >
//                                 {category.icon}
//                             </div>

//                             <p
//                                 className="mt-2 mb-0 fw-semibold"
//                                 style={{
//                                     fontSize: "14px",
//                                 }}
//                             >
//                                 {category.name}
//                             </p>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }

// export default Categories;

import {
    FaLaptop,
    FaMobileAlt,
    FaTshirt,
    FaBook,
    FaGamepad,
    FaShoePrints,
    FaClock,
    FaHeadphones,
    FaShoppingBasket,
    FaHome,
    FaFootballBall,
    FaHeart,
} from "react-icons/fa";

function Categories({
    setCategory,
    activeCategory = "",
}) {
    const categories = [
        { name: "Electronics", icon: <FaLaptop size={32} /> },
        { name: "Mobiles", icon: <FaMobileAlt size={32} /> },
        { name: "Fashion", icon: <FaTshirt size={32} /> },
        { name: "Beauty", icon: <FaHeart size={32} /> },
        { name: "Home", icon: <FaHome size={32} /> },
        { name: "Books", icon: <FaBook size={32} /> },
        { name: "Sports", icon: <FaFootballBall size={32} /> },
        { name: "Gaming", icon: <FaGamepad size={32} /> },
        { name: "Shoes", icon: <FaShoePrints size={32} /> },
        { name: "Watches", icon: <FaClock size={32} /> },
        { name: "Accessories", icon: <FaHeadphones size={32} /> },
        { name: "Groceries", icon: <FaShoppingBasket size={32} /> },
    ];

    const handleCategoryClick = (categoryName) => {
        console.log("Clicked:", categoryName);

        if (typeof setCategory === "function") {
            setCategory(categoryName);
        }
    };

    return (
        <section className="bg-white shadow-sm py-3">
            <div className="container-fluid">

                <div className="text-center my-3">
                    <h2
                        className="fw-bold"
                        style={{
                            color: "#210944",
                        }}
                    >
                        Shop By Category
                    </h2>
                </div>

                <div
                    className="d-flex justify-content-lg-center gap-4 overflow-auto px-2"
                    style={{
                        scrollbarWidth: "none",
                        whiteSpace: "nowrap",
                    }}
                >

                    {/* All Categories */}

                    <div
                        className="text-center"
                        style={{
                            minWidth: "90px",
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            handleCategoryClick("")
                        }
                    >
                        <div
                            className="d-flex justify-content-center align-items-center mx-auto rounded-circle fw-bold"
                            style={{
                                width: "70px",
                                height: "70px",
                                background:
                                    activeCategory === ""
                                        ? "#210944"
                                        : "#f8f9fa",
                                color:
                                    activeCategory === ""
                                        ? "#fff"
                                        : "#210944",
                            }}
                        >
                            All
                        </div>

                        <p className="mt-2 mb-0 fw-semibold">
                            All
                        </p>
                    </div>

                    {/* Categories */}

                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="text-center"
                            style={{
                                minWidth: "90px",
                                cursor: "pointer",
                            }}
                            onClick={() =>
                                handleCategoryClick(
                                    category.name
                                )
                            }
                        >
                            <div
                                className="d-flex justify-content-center align-items-center mx-auto rounded-circle"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    background:
                                        activeCategory ===
                                            category.name
                                            ? "#210944"
                                            : "#f8f9fa",
                                    color:
                                        activeCategory ===
                                            category.name
                                            ? "#fff"
                                            : "#210944",
                                    transition:
                                        "all 0.3s ease",
                                }}
                            >
                                {category.icon}
                            </div>

                            <p
                                className="mt-2 mb-0 fw-semibold"
                                style={{
                                    fontSize: "14px",
                                }}
                            >
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;