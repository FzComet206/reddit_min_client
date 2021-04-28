import React from 'react';
import { Box } from '@chakra-ui/react';

interface WrapperProps {  
    variant?: 'small' | 'regular'
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant='regular'}) => {
    return (
        <Box 
            padding="40px"
            borderRadius="lg"
            mx="auto"
            mt={5}
            height="800px"
            maxW={variant === "regular" ? "800px" : "400px"}
            width="100%"
            bgColor="#666686"
        >
            {children}
        </Box>
    )
}