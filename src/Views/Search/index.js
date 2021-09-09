import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../Components/Spinner";
import Rating from "../../Components/Rating";
import noImg from '../../Components/Icon/sinemaNotFound.jpeg'

const Search = () => {
    const params = useParams()
    const [films, setFilms] = useState({}) //результат поиска из бэкенда
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie/?query=${params.name}&language=en-US&page=${page}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilms(data)
                setLoading(false)
            })
    }, [params.name])

    if (loading) {
        return <Spinner/>
    }

    //PREV and NEXT
    let pageBtn = ''
if (films.total_page > 1 && page === 1) {
    pageBtn = (
        <div className='pageButton'
        onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0)
        }}
        >
          NEXT  <i className="far fa-angle-double-right"></i>
        </div>
    )
} else if (films.total_page > page && page > 1) {
    pageBtn = (
        <>
        <button
            className='pageButton'
            onClick={() => {
                setPage(page - 1)
                window.scrollTo(0, 0)
            }}
            >
            <i className="fal fa-angle-double-left"></i> PREV
        </button>
        <button
            className='pageButton'
            onClick={() => {
                setPage(page + 1)
                window.scrollTo(0, 0)
            }}
            >
            NEXT <i className="far fa-angle-double-right"></i>
        </button>
    </>
    );
} else if(films.total_page === page) {
    pageBtn = (
        <button
            className='pageButton'
        onClick={() => {
            setPage(-1)

            window.scrollTo(0, 0)
            }}
        >
            <i className="fal fa-angle-double-left"></i>PREV
        </button>
    )
}




    return (
        <div className='row'>
            {/*{*/}
            {/*    films.results.length ?*/}
            {/*        films.results.map(film =>*/}
            {/*            <div className='col-md-12 shadow-lg' key={film.id}>*/}
            {/*                <div className='box mt-4 p-3'>*/}
            {/*                    <Link to={`/moviesinfo/${film.id}`}*/}
            {/*                          className='d-flex align-content-center justify-content-between'>*/}
            {/*                        <img className='img-fluid img-thumbnail min-w-100 min-h-100 search-value-img'*/}
            {/*                             src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`}*/}
            {/*                             alt={film.title}/>*/}
            {/*                        <div className='col-md-10'>*/}
            {/*                            <h5>{film.title}</h5>*/}
            {/*                            <p className=''><b>Описание:</b> {film.overview}</p>*/}
            {/*                            <p> {film.vote_average}*/}
            {/*                            <Rating rating={Math.floor(film.vote_average)}/>*/}
            {/*                            </p>*/}
            {/*                        </div>*/}
            {/*                    </Link>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ) : <p>Not Found</p>*/}
            {/*}*/}
            {
                films.results.length ?
                    films.results.map(({poster_path, title, backdrop_path, genre_ids, overview,id, vote_average}) =>
                        <div className='col-md-12 shadow-lg' key={id}>
                            <div className='box mt-4 p-3 '>
                                <Link to={`/moviesinfo/${id}`}
                                      className='d-flex justify-content-between'>
                                    <img className='img-fluid img-thumbnail min-w-100 min-h-100 search-value-img'

                                         src={
                                             poster_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}`
                                                 : noImg
                                         }
                                                 alt={title}/>
                                    <div className='col-md-10 search-box'>
                                        <h5>{title}</h5>
                                        <p><b>Описание:</b> {overview}</p>
                                        <p className='d-flex'> {vote_average}
                                            <Rating rating={Math.floor(vote_average)}/>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    ) : <p>Not Found</p>
            }
            <button onClick={pageBtn} className='pageButton'>{pageBtn}next</button>

        </div>
    );
};

export default Search;
