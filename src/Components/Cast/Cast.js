import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import ava from '../Icon/ava.png'
import Spinner from "../Spinner";


const Cast = () => {
    const {id} = useParams()
    const [actors, setActors] = useState([])
    const [actorsLoading, setActorsLoading] = useState(true)
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}/credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActors(data.cast)
                setActorsLoading(false)
            })
    }, [id])
    if (actorsLoading) {
        return <Spinner />
    }
    return (
        <div className='container'>
            <div className='row'>
                <h3>Состав актёров</h3>
                        {
                            actors.map(actor =>
                                <div className='col-2 mt-5'>
                                    <Link to={`/person/${id}`}>
                                        <img
                                             src={actor.profile_path ? `https://www.themoviedb.org/t/p/w276_and_h350_face${actor.profile_path}` : ava}
                                             alt=''/>
                                        <p>{actor.name}</p>
                                        <p>{actor.character}</p>
                                    </Link>
                                </div>
                            )
                        }
            </div>
        </div>
    );
};

export default Cast;