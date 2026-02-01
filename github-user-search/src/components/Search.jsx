import { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);
    setUsers([]);

    try {
      // 🔹 Basic search (single username)
      if (username && !location && !repos) {
        const data = await fetchUserData(username);
        setUser(data);
      } 
      // 🔹 Advanced search
      else {
        const data = await searchUsers(username, location, repos);
        setUsers(data.items);
        setPage(1);
      }
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    const data = await searchUsers(username, location, repos, nextPage);
    setUsers((prev) => [...prev, ...data.items]);
    setPage(nextPage);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-3">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Minimum repos (optional)"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          Search
        </button>
      </form>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* 🔹 Single user result */}
      {user && (
        <div className="mt-4 border p-4">
          <img src={user.avatar_url} width="100" />
          <h3 className="font-bold">{user.name || user.login}</h3>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            View Profile
          </a>
        </div>
      )}

      {/* 🔹 Multiple users (advanced search) */}
      <div className="mt-4 space-y-3">
        {users.map((u) => (
          <div key={u.id} className="border p-3">
            <img src={u.avatar_url} width="50" />
            <a
              href={u.html_url}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-600"
            >
              {u.login}
            </a>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-4 bg-gray-800 text-white px-4 py-2 w-full"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
