import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
};

export default function PostsComponent() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    cacheTime: 1000 * 60 * 10,          // keep cache for 10 minutes
    staleTime: 1000 * 60 * 5,           // data considered fresh for 5 minutes
    refetchOnWindowFocus: false,        // do not refetch when window refocuses
    keepPreviousData: true,             // keep old data while fetching new

  });

  if (isLoading) return <p>Loading posts...</p>;
  
  if (isError) return <p>Error fetching posts.</p>;

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