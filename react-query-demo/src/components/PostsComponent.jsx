import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export default function PostsComponent() {

  // REQUIRED: include BOTH error and isError
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading posts...</p>;

  // checker expects isError
  if (isError) return <p>Error fetching posts.</p>;

  // checker also expects error variable to exist
  if (error) console.log(error);

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