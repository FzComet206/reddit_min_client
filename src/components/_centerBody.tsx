import { Box, Skeleton } from "@chakra-ui/react"
import React from "react"
import { NavBar } from "./NavBar"


export const CenterBody: React.FC<{}> = () => {

    const sk = (
        <Box padding={5}><Skeleton height="60px"/></Box>
    )

    return (
        <Box bg="#F6BD60" minWidth="100px" borderRadius="md" height="1500">

            <Box paddingTop={2}/>

            <NavBar></NavBar>

            <Box maxWidth="600px" paddingTop={5} paddingRight={1}>   
                {sk}
                {sk}
                {sk}            
            </Box>

        </Box>
    )
}