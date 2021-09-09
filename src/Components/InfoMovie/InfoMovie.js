import React, {useEffect, useState} from "react"
import axios from "axios";
import {Link, useParams} from "react-router-dom"
import Spinner from "../Spinner"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Carousel from 'react-elastic-carousel';
import ava from "../Icon/ava.png"
import {language} from "../../script";
import Trailer from "../Trailer";


//{film.budget.toLocaleString()} - для разделения миллионный счет

const InfoMovie = () => {
    const {id} = useParams() //в роутах в ПЕРВЫЕ создаем параметр(params)создаем для связки вэб страниц обьект хранит обьект ключа и его значений {id: 2345}-фактич-е значение
    const [film, setFilm] = useState({})
    const [isLoading, setIsLoading] = useState(true) //for loading
    const [actors, setActors] = useState([])
    const [actorsLoading, setActorsLoading] = useState(true)
    const [backDrop, setBeckDrop] = useState('')


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilm(data)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}/credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActors(data.cast)
                setActorsLoading(false)
            })
        axios(`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/${film.backdrop_path}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setBeckDrop(data.results))
    }, [])


    if (isLoading || actorsLoading) {
        return <Spinner/>
    }
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];
    return (
        // className='fon-bg'
    // style={{background: `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/${film.backdrop_path})`}}
        <div  className='text-light'>
            {
                backDrop?.results?.map(back =>
                    <img src={back.backdrop_path} alt=""/>
                )
            }
            <div  className='row '>
                <div className='col-md-6 mb-6'>
                    <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${film.poster_path}`}
                         alt={film.title} className='infomovie-img'/>
                </div>
                <div className='col-md-6 mt-6'>
                    <h4>Название: {film.title}</h4>
                    <div className='d-flex'>
                        <p><b>Дата:</b> {film.release_date} </p>
                        <div className='ms-4'><b>Стана:</b> {film?.production_countries[0]?.name} </div>
                        {/*<p className='ms-4'>Runtime: {Math.floor({film.runtime / 60}h {film.runtime % 60}mn)}</p>*/}
                    </div>
                    <p><b>Рейтинг: </b> {film.vote_average}</p>
                    <p><b>Жанр: </b>
                    {
                        film.genres.map(genres =>
                            <Link className='me-md-3 infomovie-underline'>{genres.name}</Link>
                        )
                    }
                </p>

                    <p><b>Бюджет:</b> {film.budget.toLocaleString()} $</p>
                    <p><b>Описание:</b> {film.overview}</p>
                    <p>Язык: {language[film.original_language]}</p>

                    {/*<h4>Производители:</h4>*/}
                    {/*{*/}
                    {/*    film.production_companies.map(company =>*/}
                    {/*        <div key={company.id}>{company.name}</div>*/}
                    {/*    )*/}
                    {/*}*/}
                    {/*<h4>Страны:</h4>*/}
                    {/*{*/}
                    {/*    film.production_countries.map(country =>*/}
                    {/*        <div key={country.id}>{country.name}</div>*/}
                    {/*    )*/}
                    {/*}*/}

                </div>
            </div>
            <h3 className='mt-xl-5 infomovie-underline'>Главных в ролях:</h3>
            {/*enableAutoPlay autoPlaySpeed={3000}*/}
            <Carousel breakpoints={breakPoints} className='owl-theme mt-5 rec-arrow'  itemsToShow={3}>
                {
                    actors.slice(0, 5).map(actor =>
                        <div key={actor.id}>
                            <Link to={`/person/${actor.id}`}>
                                <img className='actor__img'
                                     src={actor.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}` : ava}
                                     alt=''/>
                                <p>{actor.name}</p>
                                <p>{actor.character}</p>
                            </Link>
                        </div>
                    )
                }
                <Link to={`/cast/${id}`}>
                    See more
                </Link>
            </Carousel>
            <h4 className='infomovie-underline'>Трейлеры к фильму:</h4>
            <Trailer id={id}/>
        </div>

    )
}
export default InfoMovie

