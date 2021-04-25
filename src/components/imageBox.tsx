import { Box, Center, Flex, Image } from "@chakra-ui/react"
import React from "react"

type ImageBoxProps = {
    url: string,
    alt: string,
}

export const ImageBox: React.FC<ImageBoxProps> = ({url, alt}) => {
    return (
        <Flex bg="#7284A8" mt={1} borderRadius="lg" alignContent="center">
            <Box
                mt={10}
                boxSize="xl"
            >   
                <Center>
                    <Image 
                        src={url}
                        alt={alt}
                    ></Image>
                </Center>
            </Box>
        </Flex>
    )
}