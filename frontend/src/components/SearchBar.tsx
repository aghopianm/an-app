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
    <Box position="relative" ref={searchBarRef}>
      <Flex>
        <Input
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          color="white"
          pr="32px"
        />
        {query && (
          <IconButton
            position="absolute"
            right="70px"
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            aria-label="Clear search"
            icon={<CloseIcon />}
            onClick={handleClearSearch}
            variant="ghost"
            zIndex={2}
          />
        )}
        <Button
          onClick={() => handleSearch()}
          bg="green.500"
          _hover={{ bg: "green.400" }}
          leftIcon={<SearchIcon />}
        >
          Go
        </Button>
      </Flex>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          bg="gray.700"
          borderRadius="md"
          mt="2"
          p="2"
          zIndex="10"
          boxShadow="md"
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
                  leftIcon={<DeleteIcon />}
                >
                  Clear All
                </Button>
              </Flex>
              <Separator />
              {recentSearches.map((search, index) => (
                <HStack
                  key={index}
                  p="2"
                  _hover={{ bg: "gray.600" }}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => handleRecentSearchClick(search)}
                  justify="space-between"
                >
                  <Text color="white">{search}</Text>
                  <IconButton
                    size="xs"
                    aria-label="Remove search"
                    icon={<CloseIcon />}
                    onClick={(e) => removeSearch(e, search)}
                    variant="ghost"
                  />
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