import React from "react";
import type { Book } from "../types";

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  const author =
    Array.isArray(book.author_name) && book.author_name.length > 0
      ? book.author_name.join(", ")
      : typeof book.author_name === "string"
      ? book.author_name
      : "Unknown Author";

  const languages =
    book.language && Array.isArray(book.language)
      ? book.language.join(", ")
      : "N/A";

  const publishers =
    book.publisher && Array.isArray(book.publisher)
      ? book.publisher.join(", ")
      : "N/A";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-600 hover:text-red-500 text-2xl"
        >
          ×
        </button>

        <img
          src={coverUrl}
          alt={book.title}
          className="w-40 h-56 mx-auto rounded-md mb-4 object-cover"
        />
        <h2 className="text-2xl font-semibold text-center mb-2 text-slate-800">
          {book.title}
        </h2>
        <p className="text-center text-slate-600 mb-2">
          by <strong>{author}</strong>
        </p>
        {book.first_publish_year && (
          <p className="text-center text-sm text-slate-500 mb-1">
            First Published: {book.first_publish_year}
          </p>
        )}
        <p className="text-center text-sm text-slate-500 mb-1">
          Language: {languages}
        </p>
        <p className="text-center text-sm text-slate-500 mb-4">
          Publisher: {publishers}
        </p>

        <div className="text-center">
          <a
            href={book.read_url || `https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Read Book
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
