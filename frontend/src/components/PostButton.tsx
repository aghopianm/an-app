
import { Button, Flex } from '@chakra-ui/react';

type PostButtonProps = {
  handlePostStatus: () => void;
}

const PostButton = ({ handlePostStatus }: PostButtonProps) => {
  return (
    <Flex justify="flex-end">
      <Button backgroundColor={'green.400'} onClick={handlePostStatus}>
        Post
      </Button>
    </Flex>
  );
};

export default PostButton;
