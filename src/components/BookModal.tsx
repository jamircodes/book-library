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
    : "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-48 h-64 object-cover mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-700 mb-1">
            Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
          </p>
          <p className="text-gray-700 mb-1">
            Published: {book.first_publish_year || "N/A"}
          </p>
          <p className="text-gray-700 mb-1">
            Language: {book.language ? book.language.join(", ") : "N/A"}
          </p>
          <p className="text-gray-700 mb-1">
            Publisher: {book.publisher ? book.publisher.join(", ") : "N/A"}
          </p>
          {book.read_url && (
            <a
              href={book.read_url}
              target="_blank"
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Read Online
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookModal;
