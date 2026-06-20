import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {

    const navigate = useNavigate();

    useEffect(() => {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const token =
            params.get("token");

        if (token) {

            localStorage.setItem(
                "token",
                token
            );

            fetch(
                "https://cv-strore.onrender/api/users/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            )
                .then((res) =>
                    res.json()
                )
                .then((data) => {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            data.user
                        )
                    );

                    navigate("/");
                });

        } else {

            navigate("/login");

        }

    }, []);

    return (
        <div className="container text-center mt-5">
            <h3>
                Logging in with Google...
            </h3>
        </div>
    );
}

export default GoogleSuccess;