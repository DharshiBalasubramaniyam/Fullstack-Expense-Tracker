import { memo } from "react";

const Search = memo(({ onChange, placeholder }) => {
    return (
        <input
            type='text'
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    )
})

export default Search;