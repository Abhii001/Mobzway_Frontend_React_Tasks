import { Link } from 'react-router-dom';

function Book({ bookDetails }) {
  return (
    <div className="rounded border-4 border-[#a29ba3] p-3 flex flex-col justify-center">
      <div className="flex justify-center">
        <img src={bookDetails.cover} alt={bookDetails.title} className="rounded" />
      </div>
      <div className="my-4 px-2">
        <h1 className="text-lg font-bold">{bookDetails.title}</h1>
        <p>{bookDetails.pages} pages</p>
        <p>{bookDetails.releaseDate}</p>
        <p>{bookDetails.originalTitle}</p>
      </div>
      <Link
        to={`/books/${bookDetails.number}`}
        className="block text-center px-4 py-2 rounded-lg shadow-lg bg-[#c412b5] text-white"
      >
        View Book
      </Link>
    </div>
  );
}

export default Book;
