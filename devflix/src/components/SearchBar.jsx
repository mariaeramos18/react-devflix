function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Buscar aula pelo título..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar aulas"
      />
    </div>
  );
}
export default SearchBar;