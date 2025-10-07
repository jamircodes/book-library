import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import type { Book } from "../types";

const islamicTopics = [
  "Quran",
  "Hadith",
  "Seerah",
  "Islamic History",
  "Tafsir",
  "Islamic Philosophy",
  "Sufism",
  "Imam Ghazali",
  "Islamic Ethics",
];

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Load Islamic-themed default books
  useEffect(() => {
    const fetchDefaultBooks = async () => {
      setLoading(true);
      const topic =
        islamicTopics[Math.floor(Math.random() * islamicTopics.length)];
      const res = await fetch(`https://openlibrary.org/search.json?q=${topic}`);
      const data = await res.json();
      type OpenLibraryDoc = {
        key: string;
        title: string;
        author_name?: string[];
        cover_i?: number;
        id_goodreads?: string;
      };
      const formatted: Book[] = data.docs
        .slice(0, 20)
        .map((item: OpenLibraryDoc) => ({
          key: item.key,
          title: item.title,
          author_name: item.author_name?.[0] || "Unknown Author",
          cover_i: item.cover_i,
          read_url: item.id_goodreads || `https://openlibrary.org${item.key}`,
        }));
      setBooks(formatted);
      setLoading(false);
    };
    fetchDefaultBooks();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    type OpenLibraryDoc = {
      key: string;
      title: string;
      author_name?: string[];
      cover_i?: number;
      id_goodreads?: string;
    };
    const formatted: Book[] = data.docs
      .slice(0, 20)
      .map((item: OpenLibraryDoc) => ({
        key: item.key,
        title: item.title,
        author_name: item.author_name?.[0] || "Unknown Author",
        cover_i: item.cover_i,
        read_url: item.id_goodreads || `https://openlibrary.org${item.key}`,
      }));
    setBooks(formatted);
    setLoading(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p className="text-center mt-10 text-slate-500">Loading books...</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default Home;
