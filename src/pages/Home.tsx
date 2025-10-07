import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import type { Book } from "../types";

const islamicTopics = [
  "Quran",
  "Hadith",
  "Seerah",
  "Tafsir",
  "Sufism",
  "Islamic Philosophy",
  "Imam Ghazali",
  "Islamic History",
  "Islamic Ethics",
  "Ibn Taymiyyah",
  "Fiqh",
  "Tasawwuf",
  "Islamic Civilization",
];

// ✅ Define Open Library API response structure
interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  id_goodreads?: string;
  language?: string[];
  publisher?: string[];
  first_publish_year?: number;
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 🕌 Load Islamic-themed default books
  useEffect(() => {
    const fetchDefaultBooks = async (): Promise<void> => {
      try {
        setLoading(true);
        const topic =
          islamicTopics[Math.floor(Math.random() * islamicTopics.length)];

        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(topic)}`
        );

        if (!res.ok) throw new Error("Network response was not ok");

        const data: OpenLibraryResponse = await res.json();

        const formatted: Book[] = data.docs.slice(0, 20).map((item) => ({
          key: item.key,
          title: item.title,
          author_name: item.author_name?.[0] ?? "Unknown Author",
          cover_i: item.cover_i,
          read_url: item.id_goodreads
            ? `https://www.goodreads.com/book/show/${item.id_goodreads}`
            : `https://openlibrary.org${item.key}`,
          language: item.language,
          publisher: item.publisher,
          first_publish_year: item.first_publish_year,
        }));

        setBooks(formatted);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultBooks();
  }, []);

  // 🔍 Handle search — any language / any type of book
  const handleSearch = async (query: string): Promise<void> => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      if (!res.ok) throw new Error("Failed to fetch search results");

      const data: OpenLibraryResponse = await res.json();

      const formatted: Book[] = data.docs.slice(0, 20).map((item) => ({
        key: item.key,
        title: item.title,
        author_name: item.author_name?.[0] ?? "Unknown Author",
        cover_i: item.cover_i,
        read_url: item.id_goodreads
          ? `https://www.goodreads.com/book/show/${item.id_goodreads}`
          : `https://openlibrary.org${item.key}`,
        language: item.language,
        publisher: item.publisher,
        first_publish_year: item.first_publish_year,
      }));

      setBooks(formatted);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* 🔝 Search Bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-5xl mx-auto py-4 px-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* 📚 Book Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center mt-20 text-slate-500 animate-pulse">
            📖 বইগুলো লোড হচ্ছে...
          </p>
        ) : books.length > 0 ? (
          <BookList books={books} />
        ) : (
          <p className="text-center mt-20 text-slate-400 italic">
            কোনও বই পাওয়া যায়নি। 🔍
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
