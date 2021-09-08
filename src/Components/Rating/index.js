import React from 'react';

const Rating = (props) => {

    return (
        <div>
            <i className={`fas fa-star ${props.vote_average > 0 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 1 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 2 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 3 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 4 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 5 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 6 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 7 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 8 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 9 && 'orange-rating'}`}/>
            <i className={`fas fa-star ${props.vote_average > 10 && 'orange-rating'}`}/>
        </div>
    );
};

export default Rating;