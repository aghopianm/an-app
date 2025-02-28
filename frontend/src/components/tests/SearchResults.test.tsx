import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import SearchResults from '../SearchResults';
import axiosInstance from '@/api/axiosInstance';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

vi.mock('react-router-dom', async () => {
    const actual = await import('react-router-dom');
    return {
      ...actual,
      useLocation: vi.fn(),
      useNavigate: vi.fn(),
    };
  });
  
vi.mock('@/api/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('SearchResults Component', () => {
  const mockNavigate = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderSearchResults = (query = 'test') => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/search',
      search: `?query=${query}`,
      hash: '',
      state: null,
      key: 'default',
    });

    return render(
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>
      </ChakraProvider>
    );
  };

  it('displays loading state while fetching data', async () => {
    vi.mocked(axiosInstance.get).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => 
        resolve({ data: { status: 'success', data: [] } }), 100)
      )
    );

    renderSearchResults();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays search results when API returns data', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: { status: 'success', data: mockUsers }
    });

    renderSearchResults();

    await waitFor(() => {
      expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
      expect(screen.getByText('Name: Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
    });
  });

  it('displays no results message when API returns empty array', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { status: 'success', data: [] } });
    renderSearchResults('nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No results found for "nonexistent"')).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(new Error('Network error'));
    renderSearchResults();

    await waitFor(() => {
      expect(screen.getByText(/Error fetching search results: Network error/i)).toBeInTheDocument();
    });
  });

  it('displays error for unexpected response format', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: { status: 'success', results: [] }
    });
    renderSearchResults();

    await waitFor(() => {
      expect(screen.getByText('Unexpected response format')).toBeInTheDocument();
    });
  });

  it('navigates to home when Clear Results button is clicked', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: { status: 'success', data: [{ id: 1, name: 'Test User', email: 'test@example.com' }] }
    });
    renderSearchResults();

    await waitFor(() => {
      expect(screen.getByText('Name: Test User')).toBeInTheDocument();
    });

    const clearButton = screen.getByRole('button', { name: /clear results/i });
    fireEvent.click(clearButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('disables Clear Results button when there are no results', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({ data: { status: 'success', data: [] } });
    renderSearchResults('test');

    await waitFor(() => {
      expect(screen.getByText('No results found for "test"')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /clear results/i })).toBeDisabled();
    });
  });
  
  it('does not fetch results when query is empty', async () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: '/search', search: '', hash: '', state: null, key: 'default' });

    render(
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(axiosInstance.get).not.toHaveBeenCalled();
  });
});
