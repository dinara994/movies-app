import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import Cast from "./Cast";

const InfoMovie = (actorInfo) => {
    const {id} = useParams() //для связки вэб страниц обьект хранит обьект {id: 2345}-фактич-е значение
    const [film, setFilm] = useState({})


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setFilm(data))
    }, [id])

    return (

        <div className='row hero'>
            {
                <div className='info__parametr style__text'>
                    <div className='col-3'>
                        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}` }
                             alt={film.title} className='infomovie-img'/>
                    </div>
                    <div className='col-9'>
                        <h4>{film.original_title}</h4>
                        <span>Popularity: {film.popularity}</span>
                        <p>{film.overview}</p>
                    </div>

                </div>
            }
            <Cast actorInfo={actorInfo} />

        </div>
    )
}

export default InfoMovie

