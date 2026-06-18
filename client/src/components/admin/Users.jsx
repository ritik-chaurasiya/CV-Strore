import {
    useEffect,
    useState,
} from "react";

import {
    getUsers,
    deleteUser,
} from "../../services/userService";

function Users() {

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [users, setUsers] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers =
        async () => {

            try {

                const {
                    data,
                } =
                    await getUsers();

                setUsers(
                    data.users
                );

            } catch (
            error
            ) {

                console.log(
                    error
                );

            }

        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this user?"
                );

            if (
                !confirmDelete
            )
                return;

            try {

                await deleteUser(
                    id
                );

                fetchUsers();

            } catch (
            error
            ) {

                console.log(
                    error
                );

            }

        };

    const filteredUsers =
        users.filter(
            (user) =>
                user.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                user.email
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (
        <>
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

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center flex-wrap">

                            <div>

                                <h2 className="fw-bold text-white mb-1">
                                    Users Management
                                </h2>

                                <p className="text-light mb-0 opacity-75">
                                    Manage all registered users from one place
                                </p>

                            </div>

                            <div className="mt-3 mt-md-0">

                                <span
                                    className="badge bg-light text-dark px-4 py-3 fs-6 shadow-sm"
                                    style={{
                                        borderRadius: "12px",
                                    }}
                                >
                                    👥 Total Users: {users.length}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Stats */}

                <div className="row g-4 mb-4">

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Users
                                </h6>

                                <h2 className="fw-bold">
                                    {users.length}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Active Users
                                </h6>

                                <h2 className="fw-bold text-success">
                                    {users.length}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    New This Month
                                </h6>

                                <h2 className="fw-bold text-primary">
                                    {
                                        users.filter(
                                            (user) =>
                                                new Date(
                                                    user.createdAt
                                                ).getMonth() ===
                                                new Date().getMonth()
                                        ).length
                                    }
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="🔍 Search by name or email..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Table */}

                <div className="card border-0 shadow-lg">

                    <div
                        className="card-header text-white"
                        style={{
                            background:
                                "linear-gradient(135deg,#210944,#08264c)",
                        }}
                    >
                        <h5 className="m-0 fw-bold">
                            Users List
                        </h5>
                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>Photo</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Orders</th>

                                        <th>Joined</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredUsers.map(
                                        (user) => (

                                            <tr
                                                key={
                                                    user._id
                                                }
                                            >

                                                <td>

                                                    <img
                                                        src={
                                                            user.profilePhoto ||
                                                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                                        }
                                                        alt=""
                                                        width="50"
                                                        height="50"
                                                        className="rounded-circle border shadow-sm"
                                                        style={{
                                                            objectFit:
                                                                "cover",
                                                        }}
                                                    />

                                                </td>

                                                <td>

                                                    <div>

                                                        <h6 className="mb-0 fw-bold">
                                                            {
                                                                user.name
                                                            }
                                                        </h6>

                                                        <small className="text-muted">
                                                            ID:
                                                            {" "}
                                                            {user._id.slice(
                                                                -6
                                                            )}
                                                        </small>

                                                    </div>

                                                </td>

                                                <td>
                                                    {
                                                        user.email
                                                    }
                                                </td>

                                                <td>

                                                    <span className="badge bg-success px-3 py-2">
                                                        {
                                                            user.orderCount ||
                                                            0
                                                        }
                                                    </span>

                                                </td>

                                                <td>

                                                    <span className="badge bg-info">

                                                        {new Date(
                                                            user.createdAt
                                                        ).toLocaleDateString()}

                                                    </span>

                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-outline-primary btn-sm me-2 m-1"
                                                        onClick={() =>
                                                            setSelectedUser(
                                                                user
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                user._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


            </div>

            {selectedUser && (
                <div
                    className="modal d-block"
                    style={{
                        background: "rgba(0,0,0,0.6)"
                    }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content border-0 shadow-lg">

                            <div
                                className="modal-header text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#210944,#08264c)"
                                }}
                            >
                                <h5 className="fw-bold">
                                    👤 User Profile
                                </h5>

                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() =>
                                        setSelectedUser(null)
                                    }
                                />
                            </div>

                            <div className="modal-body">

                                <div className="text-center">

                                    <img
                                        src={
                                            selectedUser.profilePhoto ||
                                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        }
                                        alt=""
                                        width="120"
                                        height="120"
                                        className="rounded-circle shadow border"
                                    />

                                    <h3 className="fw-bold mt-3">
                                        {selectedUser.name}
                                    </h3>

                                    <p className="text-muted">
                                        {selectedUser.email}
                                    </p>

                                </div>

                                <div className="row mt-4 g-3">

                                    <div className="col-md-4">

                                        <div className="card border-0 bg-light">

                                            <div className="card-body text-center">

                                                <h2 className="text-primary">
                                                    {selectedUser.orderCount || 0}
                                                </h2>

                                                <p className="mb-0">
                                                    Orders
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 bg-light">

                                            <div className="card-body text-center">

                                                <h6>
                                                    Joined
                                                </h6>

                                                <strong>
                                                    {new Date(
                                                        selectedUser.createdAt
                                                    ).toLocaleDateString()}
                                                </strong>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 bg-light">

                                            <div className="card-body text-center">

                                                <h6>
                                                    User ID
                                                </h6>

                                                <small>
                                                    {selectedUser._id}
                                                </small>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}

export default Users;