import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

const Cast = (actorInfo) => {
    const {id} = useParams()
    const [actors, setActors] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}/credits?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    }, [id])
    return (
        <div className='container'>
            <div className='row'>
                {
                    actors.map((el, idx) =>
                        <div key={idx} className='col-2 info__parametr'>
                            <Link to={`/moviesinfo/${el.id}`} className='infomovie__box'>
                                <img className='actor__omg'
                                     src={`https://www.themoviedb.org/t/p/w276_and_h350_face/${el.profile_path}`}
                                     alt=""/>
                                <h4 className='actor__name'>{el.name}</h4>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Cast;