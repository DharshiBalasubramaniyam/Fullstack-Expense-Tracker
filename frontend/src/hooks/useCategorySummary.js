import { useEffect, useState } from "react";
import useCategories from "./useCategories";
import UserService from "../services/userService";
import AuthService from "../services/auth.service";

function useCategorySummary(currentMonth) {
    const [categories, category_response, isFetchingCategories] = useCategories()
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        async function generateSummary() {
            const filtered = [];
            await Promise.all(categories.filter(cat => cat.transactionType.transactionTypeId === 1).map(async (cat) => {
                try {
                    const response = await UserService.getTotalByCategory(AuthService.getCurrentUser().email, cat.categoryId, currentMonth.id, currentMonth.year);
                    if (response.data.status === "SUCCESS" && response.data.response) {
                        filtered.push({ category: cat.categoryName, amount: Number(response.data.response ? response.data.response.toFixed(2) : 0) });
                    }
                } catch (error) {
                    console.log(error)
                }
            }));
            setData(filtered)
            setIsFetching(false)
        }

        if (categories && category_response==="") {
            generateSummary()
        }
        
    }, [categories, currentMonth])

    return [data, category_response, isFetching];
}

export default useCategorySummary;