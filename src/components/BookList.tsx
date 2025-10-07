import React from "react";
import type { Book } from "../types";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <section className="py-10 bg-slate-50" id="featured">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Featured Books
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
