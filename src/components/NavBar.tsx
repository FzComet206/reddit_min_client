
import { Box, Button, ChakraComponent, Flex, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Skeleton, Wrap } from "@chakra-ui/react"
import React from "react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import { RedirectingButton } from "./Buttons";
import { isServer } from "../utils/isServer";
import { InfoIcon, SettingsIcon } from "@chakra-ui/icons";
import { InputType } from "node:zlib";

interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    
    // self query
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });

    // loading and routing
    const [, logout] = useLogoutMutation();
    const [loading, setloading] = useState(false);
    const router = useRouter();
    
    // todo: search bar
    const [value, setValue] = useState("")
    const handleChange = (event:React.FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value)

    let body = null;

    if (fetching) {
        body = (
            <Skeleton height="40px"></Skeleton>
        )
    // data is loading
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
            <>
                <HStack spacing="20px">
                    <Box fontSize="25px" fontWeight="semibold" textColor="whiteAlpha.800">
                        {data.me.nickname}
                    </Box>

                    <Menu>

                        <MenuButton 
                            as={Button}
                            rightIcon={<SettingsIcon />} 
                            colorScheme="linkedin" 
                            fontSize="15px"
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
        )
    }
    // handle three states for logged in or not

    return (
        <Flex bg="#4E598C" p={5} borderRadius="lg" mr="5px" ml="5px">

            <Flex width="80%">

                <Box 
                    textColor="whiteAlpha.800" 
                    fontWeight="semibold" 
                    fontSize="25px"
                    mx="auto"
                >Cl Reddit
                </Box>

                <Box
                    bgColor="whiteAlpha.100"
                    mx="auto"
                    width="70%"
                >
                    <Input
                        value={value}
                        onChange={handleChange}
                        placeholder="Search for posts"
                        size="md"
                        textColor="whiteAlpha.800"
                    />
                </Box>

            </Flex>
            
            <Box width="280px" ml="30px">
                <Skeleton isLoaded={!fetching} transition="ease-out">
                    {body}
                </Skeleton>
            </Box>

        </Flex>
    )
}