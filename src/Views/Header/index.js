import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";

const Header = () => {
    const [search, setSearch] = useState('')

    const history = useHistory()
    const handleClick = () => {
        setSearch('')  //инпут очищается
        if (search.trim()) {
            history.push(`/search/${search}`) //история передается в компонент search
        }
    }
    const handleBtn = (ev) => {
        setSearch(ev.target.value.toLowerCase())// прежде чем класть в state - превращаем нижний регистр
    }

    return (
        <div className='header navbar-custom p-lg-4 d-flex justify-content-between bg-dark navbar-light text-white'>
            <nav className='navbar-custom'>
                <a href="/" className='logo'>You logo
                    <img src='/' alt=""/>
                </a>
                <Link to='/home'>Home</Link>
            </nav>
            <div>
                <input type="text" value={search} onChange={handleBtn}/>
                <button onClick={handleClick} rel="stylesheet">Search</button>
            </div>
        </div>
    );
};


export default Header


