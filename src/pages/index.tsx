import { useRouter } from 'next/router';
import { NavBar } from '../components/NavBar';

const Index = () => {
    const router = useRouter();
    return (
        <NavBar/>
    )
};
export default Index;
