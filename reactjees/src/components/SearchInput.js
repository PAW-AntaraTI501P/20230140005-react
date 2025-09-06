const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mt-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari todo..."
        className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
      />
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchInput;
