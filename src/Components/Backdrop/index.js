import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const Backdrop = () => {
    const [isBackdrop, setIsBackdrop] = useState({})
    const {id} = useParams()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${id}/recommendations?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) =>  setIsBackdrop(data))
    },[id])

    return (
        <div>
            <img src={isBackdrop.backdrop_path} alt=""/>
        </div>
    );
};

export default Backdrop;