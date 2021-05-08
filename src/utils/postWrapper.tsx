import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface postWrapperProps {
    title: string,
    text: string,
    createdat: string,
    points: number
}

export const PostWrapper: React.FC<postWrapperProps> = ({title, text, createdat, points, ...props}) => {

    let t;
    if (text.length > 501) {
        t = text.slice(0, 500)
    } else {
        t = text
    }

    return (
        <Flex direction="column" {...props} >
            <Box bgColor="linkedin.100" padding="10px" borderRadius="md">
                <Box fontWeight="semibold">Title: {title}</Box>
                <Box p="15px">{t}</Box>
                <Box fontWeight="semibold" >post created at {createdat} ----- upvotes {points}</Box>
            </Box>
        </Flex>
    )
};
