import React from "react";
import type { Book } from "../types";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  const readLink = book.read_url || `https://openlibrary.org${book.key}`;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 w-56">
      <img
        src={coverUrl}
        alt={book.title}
        className="h-72 w-full object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="font-semibold text-slate-800 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-slate-600 mt-1">{book.author_name}</p>
        <a
          href={readLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Read Book →
        </a>
      </div>
    </div>
  );
};

export default BookCard;
