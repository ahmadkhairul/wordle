'use client'

type SearchProps = {
  label?: string;
  search: string;
  setSearch: (value: string) => void;
}

export function Search({
  label,
  search,
  setSearch,
}: SearchProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor="search" className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search something..."
      />
    </div>
  );
}
