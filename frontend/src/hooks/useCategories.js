import { useEffect, useState } from "react";
import UserService from "../services/userService";

function useCategories() {
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("")
    const [isFetching,  setIsFetching] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const category_response = await UserService.get_categories().then(
                (response) => {
                    if (response.data.status === "SUCCESS") {
                        setCategories(response.data.response)
                        return
                    }
                    setMessage({ status: "FAIL", text: "Failed to fetch all categories: Try again later!" })
                },
                (error) => {
                    error.response ?
                        setMessage({ status: "FAIL", text: error.response.data.response })
                        :
                        setMessage({ status: "FAIL", text: "Failed to fetch all categories: Try again later!" })
                }
            )
            setIsFetching(false)
        }

        getCategories()
    }, [])

    return [categories, message, isFetching];
}

export default useCategories;