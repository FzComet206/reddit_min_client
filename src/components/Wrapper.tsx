import React from 'react';
import { Box } from '@chakra-ui/react';

interface WrapperProps {  
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant='regular'}) => {
    return (
        <Box 
            paddingLeft={3}
            paddingRight={3}
            mx="auto"
            mt={5}
            maxW={variant === "regular" ? "800px" : "400px"}
            width="100%"
        >
            {children}
        </Box>
    )
}