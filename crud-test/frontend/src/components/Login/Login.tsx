import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IResRegisterOrLogin } from "../../interfaces";
import { addUser } from "../../reducer/authStore";

const Login = (): JSX.Element => {

    const nav = useNavigate()
    const store = useSelector((el: any) => el.authStore)
    const dispatch = useDispatch()



    const onLogin = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();

        //@ts-ignore
        const { email, password } = e.target;

        const data = {
            email: email.value,
            password: password.value
        }

        const req = await fetch('api/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!req.ok) {
            console.log('error')
        }

        const res: IResRegisterOrLogin = await req.json();
        console.log(res);

        localStorage.setItem('user', JSON.stringify(res));
        dispatch(addUser())


        nav('/')



    }


    return (
        <>
            <div className="container">

                <h2>Авторизация</h2>
                <form onSubmit={onLogin} className="form-login">
                    <input name="email" type="text" placeholder="введите email" />
                    <input name="password" type="text" placeholder="введите пароль" />
                    <button type="submit"> Войти</button>
                </form>
            </div>
        </>
    )
};

export default Login;