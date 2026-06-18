import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import Order from "../models/Order.js";

export const uploadProfilePhoto = async (
    req,
    res
) => {
    try {

        console.log("REQ FILE:", req.file);
        console.log("USER ID:", req.params.id);

        const userId = req.params.id;

        const user = await User.findById(
            userId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const result = await new Promise(
            (resolve, reject) => {

                cloudinary.uploader
                    .upload_stream(
                        {
                            folder:
                                "cv-store-profile",
                        },
                        (
                            error,
                            result
                        ) => {
                            if (error)
                                reject(error);
                            else
                                resolve(result);
                        }
                    )
                    .end(req.file.buffer);

            }
        );

        user.profilePhoto =
            result.secure_url;

        user.profilePhotoId =
            result.public_id;

        await user.save();

        res.status(200).json({
            success: true,
            profilePhoto:
                user.profilePhoto,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


export const updateProfile = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id || id === "undefined") {
            return res.status(400).json({
                success: false,
                message: "User ID is missing",
            });
        }

        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
            },
            {
                returnDocument: "after",
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePhoto: user.profilePhoto,
            },
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password");

        const usersWithOrders =
            await Promise.all(

                users.map(
                    async (user) => {

                        const orderCount =
                            await Order.countDocuments({
                                email: user.email,
                            });

                        return {
                            ...user.toObject(),
                            orderCount,
                        };
                    }
                )

            );

        res.status(200).json({
            success: true,
            users: usersWithOrders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// export const getUsers = async (
//     req,
//     res
// ) => {

//     try {

//         const users =
//             await User.find()
//                 .select(
//                     "-password"
//                 );

//         res.status(200).json({
//             success: true,
//             users,
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message:
//                 error.message,
//         });

//     }

// };

export const deleteUser =
    async (
        req,
        res
    ) => {

        try {

            await User.findByIdAndDelete(
                req.params.id
            );

            res.status(200).json({
                success: true,
                message:
                    "User Deleted",
            });

        } catch (
            error
        ) {

            res.status(500).json({
                success: false,
                message:
                    error.message,
            });

        }

    };