import { useParams } from 'react-router-dom';
import { Books } from '../utilis/MockData';


function BookDetails() {
    const { id } = useParams();
    const bookId = isNaN(Number(id)) ? null : Number(id);
    console.log(bookId)
    const book = Books?.find((book) => book?.number === bookId);
    console.log(book)
    if (!bookId || !book) {
        return <p>Book not found</p>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-center mb-4">
                <img src={book.cover} alt={book.title} className="rounded w-1/2" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Release Date:</strong> {book.releaseDate}</p>
            <p><strong>Original Title:</strong> {book.originalTitle}</p>
            <p><strong>Description:</strong> {book.description}</p>
        </div>
    );
}

export default BookDetails;
