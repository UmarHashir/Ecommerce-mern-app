const SearchBar = ({
  keyword,
  setKeyword,
}) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;