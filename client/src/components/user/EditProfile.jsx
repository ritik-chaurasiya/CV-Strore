import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/userService";

function EditProfile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [name, setName] = useState(
        user?.name || ""
    );

    const [email, setEmail] = useState(
        user?.email || ""
    );

    const navigate = useNavigate();

    const handleSave = async () => {

        // console.log("USER:", user);
        // console.log("USER ID:", user?.id);
        // console.log("USER _ID:", user?._id);

        try {

            const userId =
                user?.id || user?._id;

            const { data } =
                await updateProfile(
                    userId,
                    {
                        name,
                        email,
                    }
                );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    data.user
                )
            );

            toast.success(
                "Profile Updated Successfully"
            );

            navigate(
                "/userprofile"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Update Failed"
            );

        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card border-0 shadow-lg">

                            <div className="card-body p-4">

                                <h2
                                    className="fw-bold text-center mb-4"
                                    style={{
                                        color: "#210944",
                                    }}
                                >
                                    Edit Profile
                                </h2>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <button
                                    className="btn w-100 text-white fw-bold"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#210944,#08264c)",
                                    }}
                                    onClick={handleSave}
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default EditProfile;