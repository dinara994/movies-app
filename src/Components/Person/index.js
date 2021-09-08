import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../Spinner";
import ava from "../Icon/ava.png";


const Person = () => {
    const [actorsLoading, setActorsLoading] = useState(true)
    const [actorInfo, setActorInfo] = useState({})
    const [acting, setActing] = useState([])
    const {id} = useParams()
// const department = acting.sort((a, b) => (b.known_for_department) - (a.known_for_department)

    const filmDate = acting // отфильтровали дату премьера,
        .filter(el => el.release_date)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) //задали две переменные для sort-ировал по возрастанию нп-р:1, 2,

    useEffect(() => {
            axios(`https://api.themoviedb.org/3/person/${id}?&api_key=6f19f87e3380315b9573c4270bfc863c`)
                .then(({data}) => {
                    setActorInfo(data)
                    setActorsLoading(false)
                })

            axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
                .then(({data}) => setActing(data.cast))
        }
        , [id])
    if (actorsLoading) {
        return <Spinner/>
    }
    return (
        <div className='row'>
            <div className='col-md-6'>
                <img className='actor__img'
                     src={actorInfo.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face${actorInfo.profile_path}` : ava}
                     alt=''/>
                <h3>Полная информация</h3>
                <div><b>Год рождения:</b><br/>{actorInfo.birthday}</div>
                <div><b>Пол:</b><br/>
                    {
                        actorInfo.gender === 1 ? "Женщина" : actorInfo.gender === 2 ? "Мужчина" : "Неизвестно"
                    }
                </div>
                <div><b>Также известность как:</b> <br/>
                {
                    actorInfo.also_known_as.map((name, index) =>
                        <div key={index}>{name}</div>
                    )
                }

                </div>
            </div>


            <div className='col-md-6'>
                <div><b>Имя:</b> <br/>{actorInfo.name}</div>
                <div><b>Биография:</b> <br/>{actorInfo.biography}</div>
                <div>
                    {
                        filmDate.map(item =>
                            <div className="d-flex">
                                <span className="me-5">{item.release_date.slice(0, 4)}</span>
                                <Link to={`/moviesinfo/${item.id}`}>
                                    <p>{item.title}</p>
                                </Link>
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        actorInfo.also_known_as.map((name, index) =>
                            <div key={index}>{name}</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Person;