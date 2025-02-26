import React, { useState } from "react";
import { Input, Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <Box>
      <Flex>
        <Input
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          color="white"
        />
        <Button
          onClick={handleSearch}
          bg="green.500"
          _hover={{ bg: "green.400" }}
        >
          Go
        </Button>
      </Flex>
    </Box>
  );
};

export default SearchBar;
