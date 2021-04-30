import { Box, Flex, Skeleton, Wrap } from "@chakra-ui/react"
import React from "react"
import { NavBar } from "./NavBar"


export const CenterBody: React.FC<{}> = () => {

    const sk = (
        <Box padding="30px"><Skeleton height="200px"/></Box>
    )

    return (
        <Box bg="#F6BD60" minWidth="300px" borderRadius="md" height="1500">

            <Box paddingTop={1}/>

            <NavBar></NavBar>

            <Flex>

                <Box 
                    ml='6px'
                    mr='5px'
                    mt='5px'
                    bg="#AAAAAA" 
                    height="100%"
                    width="75%" 
                    float="left" 
                    borderRadius="md"

                    >   
                    {sk}
                    {sk}
                    {sk}
                    {sk}
                    {sk}
                </Box>

                <Box    
                    ml="2px"
                    mr="5px"
                    mt='5px'
                    bg="#8A7968" 
                    height="1410px"
                    width="25%"
                    float="right"
                    borderRadius="md"
                    >
                    {sk}
                    {sk}
                </Box>

            </Flex>

        </Box>
    )
}