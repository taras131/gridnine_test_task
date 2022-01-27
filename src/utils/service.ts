import {IFlight} from "../models";

const months = ["Янв.", "Февр.", "Марта", "Апр.", "Мая", "Июня", "Июля", "Авг.",
    "Сент.", "Окт.", "Ноября", "Дек."];
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
export const getTime = (date: string): string => {
    return date.slice(11, 16)
}
export const getDate = (date: string): string => {
    const d = new Date(date);
    const dayNumber = d.getDay();
    const day = date.slice(8, 10)
    const monthNumber = +(date.slice(5, 7).replace(/\.0+/, '.'))
    return day + ' ' + months[monthNumber] + ' ' + days[dayNumber]
}
export const convertingMinutesToHours = (countMinutes: number): string => {
    let hours = Math.trunc(countMinutes / 60);
    let minutes = countMinutes % 60;
    return hours + ' ч ' + minutes + ' мин';
}
export const selectActiveCarriers = (flights: IFlight[]): string[] => {
    const carriersArr = [...flights.map(item => item.flight.carrier.caption)]
    const set = new Set(carriersArr)
    return  Array.from(set);
}
export const filterByCarriers = (flights: IFlight[], selectedCarriers: string[]) => {
    if(selectedCarriers.length > 0) {
        return [...flights.filter(item => selectedCarriers.includes(item.flight.carrier.caption))]
    }
    else return [...flights]
}

