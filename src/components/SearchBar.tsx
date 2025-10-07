import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 mt-8"
    >
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for any book..."
        className="w-full max-w-md bg-white shadow-md"
      />
      <Button type="submit" className="bg-blue-600 text-white">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
