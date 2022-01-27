import React, {FC} from "react";
import {ILeg} from "../../../models";
import flightRouteStyles from "./FlightRoute.module.css";
import arrowIcon from '../../../utils/icons/right-arrow.png';
import clockIcon from '../../../utils/icons/clock.png'
import {convertingMinutesToHours, getDate, getTime} from "../../../utils/service";

interface IAirportDescription {
    cityCaption: string | '',
    airportCaption: string,
    airportUid: string
}

const AirportDescription: FC<IAirportDescription> = ({
                                                        cityCaption,
                                                        airportCaption,
                                                        airportUid
                                                    }) => {
    return (
        <div className={flightRouteStyles.airport_description}>
            <p>{cityCaption && cityCaption + ' ,'} {airportCaption} </p>
            <span className={flightRouteStyles.airport_uid}>({airportUid})</span>
        </div>
    )
}

const FlightRoute: FC<ILeg> = (props) => {
    const transferCount = props.segments.length - 1
    const startAirport = <AirportDescription cityCaption={props.segments[0].departureCity
        ? props.segments[0].departureCity.caption
        : ''}
                                             airportCaption={props.segments[0].departureAirport.caption}
                                             airportUid={props.segments[0].departureAirport.uid}/>
    const startDate = props.segments[0].departureDate

    const finishAirport = <AirportDescription cityCaption={props.segments[transferCount].arrivalCity
        ? props.segments[transferCount].arrivalCity.caption
        : ''}
                                              airportCaption={props.segments[transferCount].arrivalAirport.caption}
                                              airportUid={props.segments[transferCount].arrivalAirport.uid}/>
    const finishDate = props.segments[transferCount].arrivalDate
    return (
        <div className={flightRouteStyles.wrapper}>
            <div className={flightRouteStyles.airports_info}>
                {startAirport}
                <div className={flightRouteStyles.icon_container}>
                    <img src={arrowIcon} alt="right arrow"/>
                </div>
                {finishAirport}
            </div>
            <div className={flightRouteStyles.date_info}>
                <div className={flightRouteStyles.date_description}>
                    <p>{getTime(startDate)}</p>
                    <span> {getDate(startDate)}</span>
                </div>
                <div className={flightRouteStyles.icon_container}>
                    <img src={clockIcon} alt="clock"/>
                    <p>{convertingMinutesToHours(props.duration)}</p>
                </div>
                <div className={flightRouteStyles.date_description}>
                    <span> {getDate(finishDate)}</span>
                    <p>{getTime(finishDate)}</p>
                </div>
            </div>
            {transferCount === 0 && (<hr className={flightRouteStyles.separator_line}/>)}
            {transferCount > 0 && (
                <div className={flightRouteStyles.transfer}>
                    {transferCount} пересадка
                </div>
            )}
            <div className={flightRouteStyles.carrier_info}>
                <p>Рейс выполняет: {props.segments[0].airline.airlineCode} {props.segments[0].airline.caption}</p>
            </div>
        </div>
    );
};

export default FlightRoute;