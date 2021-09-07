import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import Spinner from "../../Components/Spinner";

const Search = () => {
    const params = useParams()
    const [films, setFilms] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie/?query=${params.name}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilms(data)
                setLoading(false)
            })
    }, [params.name])


    if (loading) {
        return <Spinner/>
    }


    return (
        <div className='row'>
            {
                films.results.length ?
                films.results.map(film =>
                    <div className='col-md-3' key={film.id}>
                     <Link to={`/moviesinfo/${film.id}`}>
                         <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`}
                              alt={film.title}/>
                         <h4>{film.title}</h4>
                     </Link>
                    </div>
                ): <p>Not Found</p>
            }
            <>

            </>
        </div>
    );
};
export default Search;
