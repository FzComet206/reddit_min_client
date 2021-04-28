
import { Box, Button, HStack, Skeleton } from "@chakra-ui/react"
import React from "react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { RedirectingButton } from "./Buttons";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    
    const [{data, fetching}] = useMeQuery();
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [loading, setloading] = useState(false);
    const router = useRouter();

    let body = null;

    // data is loading
    if (fetching) {
        body = (
            <Skeleton height="40px"></Skeleton>
        )
        // owo
    } else if (!data?.me) {
        body = (
        <>
            <HStack spacing="20px">
                <Box>
                    <RedirectingButton
                        text='Login'
                        loadingText=''
                        route='/login'
                        state={loading}
                        setState={setloading}
                        router={router}
                        color='linkedin'
                    />
                </Box>
                
                <Box >
                    <RedirectingButton
                        text='Register  '
                        loadingText=''
                        route='/register'
                        state={loading}
                        setState={setloading}
                        router={router}
                        color='linkedin'
                    />
                </Box>
            </HStack>
        </>
        )
    // user is logged in
    } else {
        body = (
            // <Box mr={1500}>
            <>
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
            </>
            // </Box>
        )
    }
    // handle three states for logged in or not

    return (
        <Box bg="#4E598C" p={5} borderRadius="lg" mr={2} ml={2}>

            <Skeleton isLoaded={!fetching} transition="ease-out">
                {body}
            </Skeleton>

        </Box>
    )
}