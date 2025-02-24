
import { Box, Text } from '@chakra-ui/react';

type StatusFeedProps = {
  statuses: string[];
}

const StatusFeed = ({ statuses }: StatusFeedProps) => {
  return (
    <Box>
      {statuses.map((status, index) => (
        <Box key={index} p={4} bg="white" borderRadius="md" boxShadow="sm" mb={3}>
          <Text>{status}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default StatusFeed;
