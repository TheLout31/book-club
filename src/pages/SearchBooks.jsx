import { useEffect, useState } from "react";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    // const res = await fetch(`https://openlibrary.org/.json?q=${encodeURIComponent(query)}`);
    const res = await fetch(`https://openlibrary.org/subjects/mystery.json`);
    const data = await res.json();
    setBooks(data.docs.slice(0, 10)); // Limit results
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 mr-2"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white px-4 py-2"
        onClick={handleSearch}
      >
        Search
      </button>

      <div className="mt-4 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {books.map((book) => (
          <div key={book.key} className="p-4 border rounded shadow">
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
              className="object-cover mb-2"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h3 className="font-bold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.authors.name?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
