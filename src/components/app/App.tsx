import React, {useEffect} from 'react';
import appStyles from './App.module.css';
import SideBar from "../side-bar/SideBar";
import Main from "../main/Main";
import {getIsLoading} from "../../services/selectors/flightSelectors";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import Preloader from "../preloader/Preloader";
import {fetchFlights} from "../../services/actions/flightActionCreators";

const App = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state: RootState) => getIsLoading(state))
    useEffect(() => {
        dispatch(fetchFlights())
    }, [dispatch])
    if (isLoading) return <Preloader/>
    return (
        <div className={appStyles.container}>
            <SideBar/>
            <Main/>
        </div>
    );
}

export default App;
