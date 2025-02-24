import React from 'react';
import { Textarea } from '@chakra-ui/react';

type StatusInputProps  = {
  statusText: string;
  setStatusText: React.Dispatch<React.SetStateAction<string>>;
}

const StatusInput = ({ statusText, setStatusText }: StatusInputProps) => {
  return (
    <Textarea
      value={statusText}
      onChange={(e) => setStatusText(e.target.value)}
      placeholder="What's on your mind?"
      size="lg"
      minHeight="100px"
      resize="vertical"
      borderColor="gray.300"
    />
  );
};

export default StatusInput;
