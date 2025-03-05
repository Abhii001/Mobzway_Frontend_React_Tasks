import { useEffect } from "react";
import SearchBox from "./SearchBox";
import Book from "./Book";
import { v4 as uuidv4 } from "uuid";

function Task03({ bookData, setFilteredBooks }) {
  if (!Array.isArray(bookData)) {
    return <p>No books available.</p>;
  }

  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch("https://freetestapi.com/api/v1/books");
        let data = await response.json();
        console.log("Fetched Books:", data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    getData();
  }, [setFilteredBooks]);

  return (
    <>
      <div>
        <SearchBox setFilteredBooks={setFilteredBooks} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-8">
        {bookData.length > 0 ? (
          bookData.map((book) => <Book key={uuidv4()} bookDetails={book} />)
        ) : (
          <p className="text-center mt-4">No books to display</p>
        )}
      </div>
    </>
  );
}

export default Task03;
