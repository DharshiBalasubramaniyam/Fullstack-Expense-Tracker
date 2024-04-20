import { useEffect, useState } from "react";
import UserService from "../services/userService";
import toast from "react-hot-toast";

function useCategories() {
    const [categories, setCategories] = useState([]);
    const [isFetching,  setIsFetching] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            await UserService.get_categories().then(
                (response) => {
                    if (response.data.status === "SUCCESS") {
                        setCategories(response.data.response)
                        return
                    }
                },
                (error) => {
                    error.response ?
                        toast.error(error.response.data.response)
                        :
                        toast.error("Failed to fetch all categories: Try again later!")
                }
            )
            setIsFetching(false)
        }

        getCategories()
    }, [])

    return [categories, isFetching];
}

export default useCategories;