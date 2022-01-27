import React, {FC} from "react";
import flightItemStyles from "./FlightItem.module.css";
import {IFlightItem, ILeg} from "../../models";
import FlightRoute from "./flight-route/FlightRoute";

const FlightItem: FC<IFlightItem> = (props) => {
    const routesList = props.legs.map((item: ILeg,index)=> <FlightRoute key={index} {...item}/>)
    return (
        <div className={flightItemStyles.wrapper}>
            <div className={flightItemStyles.header}>
                <div className={flightItemStyles.logo}>{props.carrier.uid}</div>
                <div className={flightItemStyles.price}>
                    <p className={flightItemStyles.amount}>{props.price.total.amount} ₽</p>
                    <span className={flightItemStyles.amount_description}>Стоимость на одного взрослого пассажира</span>
                </div>
            </div>
            {routesList[0]}
            <hr className={flightItemStyles.routes_separator}/>
            {routesList[1]}
            <div className={flightItemStyles.button}>
                ВЫБРАТЬ
            </div>
        </div>
    );
};

export default FlightItem;