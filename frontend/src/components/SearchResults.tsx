import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import axiosInstance from "@/api/axiosInstance";

interface User {
  id: number;
  name: string;
  email: string;
}

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const query = new URLSearchParams(location.search).get("query");
    
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axiosInstance.get('/api/search', {
          params: { query },
          withCredentials: true
        });
        
        console.log('Search response:', response.data);
        
        // Check for the correct response structure
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          setResults(response.data.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error('Search error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setError(`Error fetching search results: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, [query]);

  return (
    <Box>
      <Heading mb={4}>Search Results for "{query}"</Heading>
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && results.length === 0 && (
        <Text>No results found for "{query}"</Text>
      )}
      {results.length > 0 && (
        <Box>
          {results.map((user) => (
            <Box key={user.id} p="4" borderWidth="1px" borderRadius="lg" mb="4">
              <Text fontWeight="bold">Name: {user.name}</Text>
              <Text>Email: {user.email}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchResults;