import { useState } from "react";

export default function useAuth() {
  // Simulated authentication state
  const [isAuthenticated] = useState(false);

  return { isAuthenticated };
}