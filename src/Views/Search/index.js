import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../Components/Spinner";
import Rating from "../../Components/Rating";

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
                        <div className='col-md-12 shadow-lg' key={film.id}>
                            <div className='box'>
                                <Link to={`/moviesinfo/${film.id}`}
                                      className='d-flex align-content-center justify-content-between'>
                                    <img className='img-fluid img-thumbnail min-w-100 min-h-100 search-value-img'
                                         src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`}
                                         alt={film.title}/>
                                    <div className='col-md-10'>
                                        <h5>{film.title}</h5>
                                        <p className=''><b>Описание:</b> {film.overview}</p>
                                        <p> {film.vote_average}
                                        <Rating rating={Math.floor(film.vote_average)}/>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ) : <p>Not Found</p>
            }
            <>

            </>
        </div>
    );
};
export default Search;
