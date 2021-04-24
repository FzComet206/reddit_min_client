
import { Box, Button, Flex, Link } from "@chakra-ui/react"
import React from "react"
import NLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    
    const [{data, fetching}] = useMeQuery();
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();

    let body = null;

    // data is loading
    if (fetching) {
    // user not logged in
    } else if (!data?.me) {
        body = (
        <>
            <Flex mr={1500}>
                <Box>
                    <NLink href="/login">
                    <Link mr={3}>Login</Link>
                    </NLink>
                </Box>
                
                <Box>
                    <NLink href="/register">
                        <Link mr={3}>Register</Link>
                    </NLink>
                </Box>
            </Flex>
        </>
        )
    // user is logged in
    } else {
        body = (
            <Box mr={1500}>

                <Box fontSize="2xl">
                    ID: {data.me.id}
                </Box>

                <Box fontSize="2xl">
                    {data.me.username}
                </Box>

                <Box mt={3}>
                    <Button onClick={()=>{
                        logout()
                        console.log("logged out")    // need to update cache
                    }} isLoading={logoutFetching}>  
                        Logout
                    </Button> 
                </Box>

            </Box>
        )
    }
    // handle three states for logged in or not

    return (
        <Flex bg="grey" p={6} >
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
}