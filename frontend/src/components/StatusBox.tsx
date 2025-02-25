import { useState } from 'react';
import { Box, VStack, Flex } from '@chakra-ui/react'; // Removed Divider import
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
    <Flex justify="center" align="center" width="100vw" py={10} >
      <Box width="100%" maxWidth="800px" p={5} bg="white" borderRadius="md" boxShadow="lg">
        <VStack align="stretch">
          <StatusInput statusText={statusText} setStatusText={setStatusText} />
          <PostButton handlePostStatus={handlePostStatus} />
          <StatusFeed statuses={statuses} />
        </VStack>
      </Box>
    </Flex>
  );
};

export default StatusBox;
