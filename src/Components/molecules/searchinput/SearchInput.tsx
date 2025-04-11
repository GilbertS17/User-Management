import { useState, ChangeEvent } from "react";

type SearchInputProps = {
    onSearch: (query: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
    const [searchText, setSearchText] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        onSearch(value); // Call parent with updated search
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search users..."
                className="search-input dark:bg-primary-super-dark dark:text-white"
                value={searchText}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchInput;
