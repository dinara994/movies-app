import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Browse = () => {
    const [notFound, setNotFound] = useState('')

    return (
        <Link to={`/search`}>
            {
                    notFound ? <p >{notFound}</p> : <Search films={films} />
                }

        </Link>
    );
};

export default Browse;