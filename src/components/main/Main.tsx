import React, {useEffect, useState} from 'react';
import mainStyles from './Main.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {getFlights, getSelectedCarriers} from "../../services/selectors/flightSelectors";
import FlightItem from "../flight-item/FlightItem";
import {setActiveCarriers} from "../../services/reducers/flightSlice";
import {filterByCarriers, selectActiveCarriers} from "../../utils/service";
import {IFlight} from "../../models";

const Main = () => {
    const dispatch = useDispatch()
    const [showNumberFlights, setShowNumberFlights] = useState(4)
    const selectedCarriers = useSelector((state: RootState) => getSelectedCarriers(state))
    const flights = useSelector((state: RootState) => getFlights(state))
    const flightsFilteredByCarriers = filterByCarriers(flights, selectedCarriers)
    const flightsList = flightsFilteredByCarriers.map((item: IFlight, index: number) => <FlightItem
        key={index} {...item.flight}/>)
    useEffect(() => {
        dispatch(setActiveCarriers(selectActiveCarriers(flights)))
    }, [flights.length, dispatch])
    const onMoreClick = () => {
        setShowNumberFlights(prev => prev + 5)
    }
    if (flightsFilteredByCarriers.length === 0) return (
        <div className={mainStyles.not_found}>
            <p> Hет подходящих рейсов</p>
            <p>попробуйте изменить параметры поиска</p>
        </div>)
    return (
        <div className={mainStyles.wrapper}>
            {flightsList.slice(0, showNumberFlights > flightsList.length ? flightsList.length : showNumberFlights)}
            {showNumberFlights <= flightsList.length && (
                <div className={mainStyles.more}
                     onClick={onMoreClick}>
                    Показать еще
                </div>
            )}
        </div>
    );
};

export default Main;