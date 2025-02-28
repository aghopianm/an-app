import React, { useState, useEffect, useRef } from "react";
import { Input, Box, Button, Flex, Text, VStack, HStack, IconButton, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CloseIcon, SearchIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { 
  addRecentSearch, 
  removeRecentSearch, 
  clearAllRecentSearches, 
  setCurrentQuery 
} from "../slices/searchSlice";

import type { RootState } from "../store"; // Adjust import path as needed

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchBarRef = useRef<HTMLDivElement>(null);
  
  // Redux
  const dispatch = useDispatch();
  const recentSearches = useSelector((state: RootState) => state.search.recentSearches);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Dispatch to Redux
      dispatch(addRecentSearch(searchQuery));
      dispatch(setCurrentQuery(searchQuery));
      
      navigate(`/search?query=${searchQuery}`);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  const handleClearAllSearches = () => {
    dispatch(clearAllRecentSearches());
  };

  const removeSearch = (e: React.MouseEvent, searchQuery: string) => {
    e.stopPropagation();
    dispatch(removeRecentSearch(searchQuery));
  };

  return (
    <Box position="relative" ref={searchBarRef} width="300px">
      <Flex>
        <Input
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          color="white"
          pr="50px"
          borderRightRadius={0}
        />
        {query && (
          <IconButton
            position="absolute"
            right="90px"
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            aria-label="Clear search"
            onClick={handleClearSearch}
            variant="ghost"
            color="grey.400"
            _hover={{ color: "white", bg: "red.600" }}
            zIndex={2}
          >
            <CloseIcon boxSize={3} />
          </IconButton>
        )}
        <Button
          onClick={() => handleSearch()}
          bg="green.500"
          _hover={{ bg: "green.400" }}
          borderLeftRadius={0}
          px={4}
          ml="2"
          height="40px"
        >
          <Flex align="center">
            <SearchIcon mr={2} />
            <Text>Go</Text>
          </Flex>
        </Button>
      </Flex>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="gray.800"
          borderRadius="md"
          mt="2"
          p="3"
          zIndex="10"
          boxShadow="lg"
          borderWidth="1px"
          borderColor="gray.700"
        >
          {recentSearches.length > 0 ? (
            <VStack align="stretch" spacing={2}>
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" fontWeight="bold" color="gray.300">
                  Recently Searched
                </Text>
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={handleClearAllSearches}
                >
                  <Flex align="center">
                    <DeleteIcon mr={1} boxSize={3} />
                    <Text fontSize="xs">Clear All</Text>
                  </Flex>
                </Button>
              </Flex>
              <Separator borderColor="gray.600" />
              {recentSearches.map((search, index) => (
                <HStack
                  key={index}
                  p="2"
                  _hover={{ bg: "gray.700" }}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleRecentSearchClick(search)}
                  justify="space-between"
                >
                  <Text color="white" mr={4}>{search}</Text>
                  <IconButton
                    size="xs"
                    aria-label="Remove search"
                    onClick={(e) => removeSearch(e, search)}
                    variant="ghost"
                    color="gray.400"
                    _hover={{ color: "white", bg: "gray.600" }}
                  >
                    <CloseIcon boxSize={2.5} />
                  </IconButton>
                </HStack>
              ))}
            </VStack>
          ) : (
            <Text color="gray.400" textAlign="center" p="2">
              No recent searches
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;