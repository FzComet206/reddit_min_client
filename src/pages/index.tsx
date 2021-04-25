import React from 'react';
import { ImageBox } from '../components/imageBox';
import { NavBar } from '../components/NavBar';
import { Wrapper } from '../components/Wrapper';

const Index = () => {
    return (
        <Wrapper variant='small'>
            <NavBar/>
            <ImageBox 
                url="/ohh.gif"
                alt="xdd"
            ></ImageBox>
        </Wrapper>
    )
};
export default Index;
