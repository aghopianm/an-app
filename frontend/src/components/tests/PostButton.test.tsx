import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'; // ✅ Import ChakraProvider
import { vi } from 'vitest';
import PostButton from '../PostButton';
import '@testing-library/jest-dom';

describe('PostButton Component', () => {
  it('renders the button with correct text', () => {
    render(
      <ChakraProvider value={defaultSystem}> {/* ✅ Wrap in ChakraProvider */}
        <PostButton handlePostStatus={vi.fn()} />
      </ChakraProvider>
    );
    
    const button = screen.getByRole('button', { name: /post/i });
    expect(button).toBeInTheDocument();
  });

  it('calls handlePostStatus when clicked', () => {
    const handlePostStatusMock = vi.fn();
    render(
      <ChakraProvider value={defaultSystem}> {/* ✅ Wrap in ChakraProvider */}
        <PostButton handlePostStatus={handlePostStatusMock} />
      </ChakraProvider>
    );

    const button = screen.getByRole('button', { name: /post/i });
    fireEvent.click(button);
    
    expect(handlePostStatusMock).toHaveBeenCalledTimes(1);
  });
});
