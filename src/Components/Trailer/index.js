import React, {useEffect, useState} from 'react';
import YouTube from "react-youtube";
import axios from "axios";
import Spinner from "../Spinner";
import Carousel from "react-elastic-carousel";

const Trailer = ({id}) => {
    const [trailer, setTrailer] = useState([])
    const [youtubeLoading, setYoutubeLoading] = useState(true)

    useEffect( () => {
        axios(`https://api.themoviedb.org/3/movie/${id}/videos?&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setTrailer(data.results)
                setYoutubeLoading(false)
            })
    },[id])

    if (youtubeLoading) {
        return <Spinner />
    }
    const breakPoints = [ //библеотека карусель
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    return (


                <Carousel margin={10} breakpoints={breakPoints} className='owl-theme mt-5 rec-carousel-item'  itemsToShow={3}>
                {
                    trailer.slice(0, 5).map(item =>
                        <YouTube className='youtube' videoId={item.key} opts={breakPoints}  />
                    )
                }
            </Carousel>
    );
};

export default Trailer;