import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWithAuthenticated } from "../../hooks"
import { IResRegisterOrLogin, IResUser } from "../../interfaces"
import { addUser, logout } from "../../reducer/authStore"
import { isNotEmpty } from "../../utils"

const MainContent = (): JSX.Element => {
    const dispatch = useDispatch();
    const store: IResRegisterOrLogin = useSelector((el: any) => el.authStore)
    const [stateGroups, setStateGroups] = useState<string[]>([]);
    const [stateUsers, setStateUsers] = useState<IResUser[]>([]);


    useEffect(() => {
        dispatch(addUser());
    }, [])



    const onShowGroups = async (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await fetchWithAuthenticated('group', store.token);

        if (res === 401) {
            localStorage.removeItem('user');
            dispatch(logout())
        }

        setStateGroups(res.map((el: any) => el.name))



    };

    const onAddGroup = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        const group = e.target.group.value

        const data = {
            name: group
        }

        const res = await fetchWithAuthenticated('group/create', store.token, data);

        if (res === 401) {
            localStorage.removeItem('user');
            dispatch(logout())
        }


        //@ts-ignore
        e.target.reset();

        console.log(res);
    }

    const onDelGroup = async (e: React.SyntheticEvent<HTMLButtonElement>) => {

        e.preventDefault();
        //@ts-ignore
        const group = e.target.parentNode.group.value;

        const res = await fetchWithAuthenticated('group/', store.token, null, group, 'DELETE');

        if (res === 401) {
            localStorage.removeItem('user');
            dispatch(logout())
        }

        console.log(res);

        //@ts-ignore
        e.target.parentNode.reset();

    }

    const onGetAllUsers = async (e: React.SyntheticEvent<HTMLButtonElement>) => {

        e.preventDefault();

        const res: IResUser[] | any = await fetchWithAuthenticated('user/all', store.token, null);


        if (res === 401) {
            localStorage.removeItem('user');
            dispatch(logout())
            return;
        }

        setStateUsers(res);
        console.log(res);
    }


    const onAddFriend = async (e: React.SyntheticEvent<HTMLFormElement>) => {

        e.preventDefault();
        //@ts-ignore
        const friend = e.target.friend.value;

        const res = await fetchWithAuthenticated('user/addfriend/' + friend, store.token);


    }



    if (!isNotEmpty(store)) {
        return (
            <>
                <div className="container">
                    <h4 style={{ textAlign: 'center' }}>Для взаимодействия с данным сайтом необходима авторизация</h4>

                </div>
            </>
        )
    }
    return (
        <>
            <div className="container">
                <div className="content">

                    <div className="wrapper">
                        <h3>Добавление группы</h3>
                        <form onSubmit={onAddGroup} className="createGroup">
                            <input className="groupInput" name="group" type="text" />
                            <button type="submit"> добавить группу</button>
                            <button onClick={onDelGroup} type="button">удалить группу</button>
                        </form>
                    </div>

                    <div className="wrapper wrapper-friends">
                        <h3>Добавление друзей</h3>
                        <form onSubmit={onAddFriend} className="createFriends">
                            <input className="groupInput" name="friend" type="text" />
                            <button type="submit"> добавить друга</button>
                            <button type="button">удалить из друзей</button>
                        </form>
                    </div>



                    <div style={{ display: 'inline-block' }}>

                        <button onClick={onShowGroups} className="list-groups">Показать список всех групп</button>

                        {stateGroups && stateGroups.map((el: string, i) => <div key={i}>Группа: {el}</div>)}

                    </div>
                    <div style={{ display: 'inline-block', marginLeft: '14rem' }}>
                        <button onClick={onGetAllUsers} className="list-people">Показать всех пользователей</button>

                        {stateUsers && stateUsers.map(el => <div key={el.id}>имя: {el.name}    email: {el.email}</div>)}

                    </div>
                </div>

            </div>


        </>
    )

}

export default MainContent