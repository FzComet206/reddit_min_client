
import { Box, Button, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Skeleton } from "@chakra-ui/react"
import React from "react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { RedirectingButton } from "./Buttons";
import { isServer } from "../utils/isServer";
import { ChevronDownIcon, HamburgerIcon, InfoIcon, SettingsIcon } from "@chakra-ui/icons";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
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
                
                <Box>
                    <RedirectingButton
                        text='Register'
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
                <HStack spacing="30px">
                    <Box fontSize="25px" fontWeight="semibold" textColor="whiteAlpha.800">
                        {data.me.nickname}
                    </Box>

                    {/* <Box>
                        <Button colorScheme="linkedin" onClick={()=>{
                            logout()
                            console.log("logged out")    // need to update cache
                        }} isLoading={logoutFetching}>  
                            Logout
                        </Button> 
                    </Box> */}

                    <Menu>

                        <MenuButton 
                            as={Button}
                            rightIcon={<SettingsIcon />} 
                            colorScheme="linkedin" 
                            fontSize="17px"
                        >Options</MenuButton>

                        <MenuList>
                            <MenuItem
                                onClick={() => logout()}
                                icon={<InfoIcon />}
                            >Logout</MenuItem>
                        </MenuList>

                    </Menu>
                </HStack>
            </>
            // </Box>
        )
    }
    // handle three states for logged in or not

    return (
        <Flex bg="#4E598C" p={5} borderRadius="lg" mr="5px" ml="5px">

            <Flex width="650px">
                
                <Box 
                    textColor="whiteAlpha.800" 
                    paddingTop="2px" 
                    fontWeight="semibold" 
                    fontSize="25px"
                    paddingLeft="20px"
                >Li-reddit</Box>
            </Flex>

            <Skeleton isLoaded={!fetching} transition="ease-out">
                {body}
            </Skeleton>

        </Flex>
    )
}