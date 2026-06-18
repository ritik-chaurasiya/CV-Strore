// import express from "express";
// import upload from "../middleware/upload.js";
// import {
//     uploadProfilePhoto,
// } from "../controllers/userController.js";

// const router = express.Router();

// router.put(
//     "/profile-photo/:id",
//     upload.single("image"),
//     uploadProfilePhoto
// );
// router.get("/test", (req, res) => {
//     res.json({
//         success: true,
//         message: "User Route Working",
//     });
// });

// router.get("/profile-photo/:id", (req, res) => {
//     res.json({
//         success: true,
//         id: req.params.id,
//     });
// });

// export default router;

import express from "express";
import upload from "../middleware/upload.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import {
    uploadProfilePhoto,
    updateProfile,
    getUsers,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Upload Profile Photo
router.put(
    "/profile-photo/:id",
    upload.single("image"),
    uploadProfilePhoto
);

// Update Profile
router.put(
    "/profile/:id",
    updateProfile
);

// Test Route
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "User Route Working",
    });
});

router.get("/", getUsers);

router.delete(
    "/:id",
    deleteUser
);


// goole with login

router.get(
    "/me",
    async (req, res) => {

        try {

            const token =
                req.headers.authorization?.split(
                    " "
                )[1];

            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

            const user =
                await User.findById(
                    decoded.userId
                );

            res.json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePhoto:
                        user.profilePhoto,
                },
            });

        } catch (error) {

            res.status(401).json({
                success: false,
            });

        }

    }
);


export default router;