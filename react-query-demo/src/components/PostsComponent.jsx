import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch function
const fetchPosts = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export default function PostsComponent() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error fetching posts.</p>;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={refetch}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}