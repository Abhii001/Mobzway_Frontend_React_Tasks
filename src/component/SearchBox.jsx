import { useState } from "react";
import { Books } from "../utilis/MockData";

function SearchBox({ setFilteredBooks }) {
    const [searchText, setSearchText] = useState("");

    function handleSearch() {
        const filteredBooks = Books.filter((book) =>
            book.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBooks(filteredBooks);
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setSearchText(value);

        const filteredBooks = Books.filter((book) =>
            book.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBooks(filteredBooks);
    }

    return (
        <div className="flex justify-center flex-wrap my-8">
            <div className="px-2">
                <input
                    className="border-solid border-2 border-[#a29ba3] rounded px-10 py-2 placeholder:italic"
                    placeholder="Enter Text to Search..."
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                />
            </div>
            <div className="px-8">
                <button
                    onClick={handleSearch}
                    className="border-solid border-2 border-[#a29ba3] px-4 py-2 rounded-lg shadow-lg bg-[#c412b5]"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBox;