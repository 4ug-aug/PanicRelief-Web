import { Flex, Text, Button, Grid, DropdownMenu } from '@radix-ui/themes';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface CoreServicedownProps {
    onValueChange: (value: string) => void;
}

const button_style = {
    backgroundColor: 'rgba(51,122,255,0.1)',
};

const coreServices = [
    'Workflow',
    'Email',
    'Database',
    'Authentication',
]

const CoreDropdown: React.FC<CoreServicedownProps> = ({ onValueChange }) => {

  return (
  <DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="soft" color="blue" style={{cursor: 'pointer'}}>
      Core Service
      <CaretDownIcon />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content sideOffset={5}>
    {coreServices.map((service, index) => (
      <DropdownMenu.Item key={index} onSelect={() => onValueChange(service)}>{service}</DropdownMenu.Item>
    ))}
  </DropdownMenu.Content>
</DropdownMenu.Root>
  );
}

export default CoreDropdown;