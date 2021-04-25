import { Button } from "@chakra-ui/react"
import { NextRouter } from "next/router"
import React from "react"

type ButtonProps = {
    text: string,
    route: string,
    color: string,
    loadingText: string,
    state: boolean,
    setState: any,
    router: NextRouter
}

export const RedirectingButton: React.FC<ButtonProps> = ({text, route, color, loadingText, state, setState, router})=>{
    return (
    <Button 
        onClick={()=>{
        setState(true)
        router.push(route)
        }}  
        isLoading={state}
        loadingText={loadingText}
        colorScheme={color}>  
            {text}
    </Button>
    )
}
