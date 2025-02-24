import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react'; // Removed Divider import
import StatusInput from './StatusInput';
import PostButton from './PostButton';
import StatusFeed from './StatusFeed';

const StatusBox = () => {
  const [statusText, setStatusText] = useState('');
  const [statuses, setStatuses] = useState<string[]>([]);

  // Handle posting a status
  const handlePostStatus = () => {
    if (statusText.trim() !== '') {
      setStatuses([statusText, ...statuses]); // Add the new status at the top
      setStatusText(''); // Clear the input after posting
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" p={5} bg="gray.50" borderRadius="md" boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <StatusInput statusText={statusText} setStatusText={setStatusText} />
        <PostButton handlePostStatus={handlePostStatus} />
        {/* Removed Divider */}
        <StatusFeed statuses={statuses} />
      </VStack>
    </Box>
  );
};

export default StatusBox;
