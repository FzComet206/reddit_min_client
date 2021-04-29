import React from 'react';
import { Box } from '@chakra-ui/react';

interface WrapperProps {  
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant='regular'}) => {
    return (
        <Box 
            padding="40px"
            mx="auto"
            height="1500px"
            maxW={variant === "regular" ? "800px" : "400px"}
            width="100%"
            bgColor="#566680"
        >
            {children}
        </Box>
    )
}