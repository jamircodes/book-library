import React, { useEffect, useState } from "react";
import type { Book } from "../types";
import BookCard from "./BookCard";

const featuredTopics = [
  "Quran Tafsir",
  "Hadith",
  "Seerah",
  "Imam Ghazali",
  "Islamic Philosophy",
  "Prophet Muhammad",
];

const FeaturedBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const topic =
          featuredTopics[Math.floor(Math.random() * featuredTopics.length)];
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${topic}`
        );
        const data = await res.json();

        type OpenLibraryDoc = {
          key: string;
          title: string;
          author_name?: string[];
          cover_i?: number;
        };

        const formattedBooks: Book[] = data.docs
          .slice(0, 12)
          .map((item: OpenLibraryDoc) => ({
            key: item.key,
            title: item.title,
            author_name: item.author_name?.[0] || "Unknown Author",
            cover_i: item.cover_i,
            read_url: `https://openlibrary.org${item.key}`,
          }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error("Error loading featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <section className="py-16 bg-white" id="featured">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          Featured Books
        </h2>
        <p className="text-slate-500 mb-10">
          Explore hand-picked Islamic masterpieces and spiritual classics ✨
        </p>

        {loading ? (
          <p className="text-slate-500">Loading featured books...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
