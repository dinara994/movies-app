import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <nav>
            <a href="/" className='logo margin'>You logo
                <img src='/' alt=""/>
            </a>
            <Link to={`/`}>Home</Link>
            </nav>
    );
};

export default Home;