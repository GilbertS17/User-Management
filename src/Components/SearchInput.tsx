const SearchInput = () => {
    return (
        <div className="p-5 flex ">
            <input
                type="text"
                placeholder="Search users..."
                className=" max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3251D0]"
            />
        </div>
    );
}

export default SearchInput;