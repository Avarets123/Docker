import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { addUser, logout } from "../../reducer/authStore";
import { isNotEmpty } from "../../utils";

export const Header: React.FC = () => {

    const dispatch = useDispatch();
    const store = useSelector((el: any) => el.authStore)

    useEffect(() => {

        dispatch(addUser())

    }, [])



    const onLogout = () => {

        dispatch(logout());
        localStorage.removeItem('user');

    }



    return (
        <>
            <div className="container">
                <header>
                    <NavLink className='header-link' to={'/'} >Главная</NavLink>
                    {!isNotEmpty(store) ? <NavLink className='header-link' to={'/login'}>Войти</NavLink> :
                        <NavLink className="header-link" to={'/profile'}>Профиль</NavLink>}

                    {isNotEmpty(store) ? <span onClick={onLogout} className='header-link'>Выйти</span> :
                        <NavLink className='header-link' to={'/register'}>Регистрация</NavLink>}

                </header>
            </div>

        </>
    )
}