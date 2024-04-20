import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/userService";
import toast from "react-hot-toast";

function useProfileImage() {
    const [profileImg, setProfileImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const uploadProfileImage = async (selectedFile) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('email', AuthService.getCurrentUser().email)
        formData.append('file', selectedFile)

        await UserService.uploadProfileImg(formData)
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => {
                toast.error("Failed to change profile image. Try again later")
            })
        setIsLoading(false)
    }

    const getProfileImage = async () => {
        setIsLoading(true)
        await UserService.getProfileImg()
            .then((response) => {
                displayImage(response.data.response)
            })
            .catch((error) => {
                toast.error("Failed to fetch profile image. Try again later")
            })
        setIsLoading(false)
    }

    const removeProfileImage = async () => {
        setIsLoading(true)
        await UserService.removeProfileImg()
            .then((response) => {
                window.location.reload()
            })
            .catch((error) => {
                toast.error("Failed to remove profile image. Try again later")
            });
        setIsLoading(false)
    }


    function decodeBase64Image(base64Image) {
        const binaryString = window.atob(base64Image);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; ++i) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        let type = '';
        if (base64Image.startsWith('/9j/') || base64Image.startsWith('iVBOR')) {
            type = 'image/jpeg';
        } else if (base64Image.startsWith('R0lGOD')) {
            type = 'image/gif';
        } else if (base64Image.startsWith('data:image/png;base64,')) {
            type = 'image/png';
        }

        return new Blob([bytes], { type });
    }


    function displayImage(profileImgUrl) {
        if (profileImgUrl) {
            const imageBlob = decodeBase64Image(profileImgUrl);
            const imageUrl = URL.createObjectURL(imageBlob);
            setProfileImage(imageUrl);
        } else {
            setProfileImage(null)
        }
    }

    useEffect(() => {
        getProfileImage()
    }, [])


    return [profileImg, isLoading, uploadProfileImage, removeProfileImage];

}

export default useProfileImage;