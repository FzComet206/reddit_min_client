import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { LeftBar } from './LeftBar';
import { CenterBody } from './_centerBody';

export const MainBody: React.FC<{}> = () => {
    return (
        <Flex
            paddingLeft={1}
            paddingRight={1}
            mx="auto"
            
            minWidth="900px"  
            width="70%"
        >
            <Box width="10%" minWidth="80px"  float="left" mt={1} mr={1}>
                <LeftBar/>
            </Box>

            <Box width="90%" minWidth="200px" float="right" mt={1} >
                <CenterBody/>
            </Box>

        </Flex>
    )
}