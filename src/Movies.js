import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const handleClick = (item) => {
        setPage(item)
    }
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?en=US&page=${page}&sort_by=popularity.desc&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovies(data.results))
    },[page]) //зависимость
    return (
        <div className="container">
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} type="button" onClick={() => handleClick(item + 1)}>{item + 1}</button>
                )
            }
            <div className="row">
                {
                    movies.map(el =>
                        <Link key={el} to={`/moviesinfo/${el.id}`}  className='col-3'>
                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${el.poster_path}`} alt='title'/>
                            <h4>{el.original_title}</h4>
                        </Link>
                    )
                }
            </div>

        </div>
    )
}
export default Movies