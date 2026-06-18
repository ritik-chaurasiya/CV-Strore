import axios from "axios";

export const uploadProfilePhoto = async (id, formData) => {

    return await axios.put(
        `https://cv-strore.onrender.com/api/users/profile-photo/${id}`,
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );
};
export const updateProfile = async (
    id,
    userData
) => {

    return await axios.put(
        `https://cv-strore.onrender.com/api/users/profile/${id}`,
        userData
    );

};   

export const getUsers =
    async () => {

        return await axios.get(
            "https://cv-strore.onrender.com/api/users"
        );

    };

export const deleteUser =
    async (id) => {

        return await axios.delete(
            `https://cv-strore.onrender.com/api/users/${id}`
        );

    };