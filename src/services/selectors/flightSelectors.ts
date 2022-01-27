import {RootState} from "../store";
import {ICarrier, IFlight} from "../../models";
import {TSortBy} from "../reducers/flightSlice";
import {BY_ASCENDING_PRICE, BY_DESCENDING_PRICE, BY_TRAVEL_TIME} from "../../utils/const";
import {RootStateOrAny} from "react-redux";

export const getAllFlight = (state: RootState): IFlight[] => {
    return state.flight.flights
}
export const getFlights = (state: RootState): IFlight[] => {
    let tempFlight = [...state.flight.flights]
    if (state.flight.filterPrice.min !== 0) {
        tempFlight = [...tempFlight.filter((item) => item.flight.price.total.amount > state.flight.filterPrice.min)]
    }
    if (state.flight.filterPrice.max !== 0) {
        tempFlight = [...tempFlight.filter((item) => item.flight.price.total.amount < state.flight.filterPrice.max)]
    }
    if(state.flight.filterCountTravel.notTravel && !state.flight.filterCountTravel.oneTravel){
        tempFlight = [...tempFlight.filter((item) => item.flight.legs[0].segments.length === 1)]
        tempFlight = [...tempFlight.filter((item) => item.flight.legs[1].segments.length === 1)]
    }
    if(!state.flight.filterCountTravel.notTravel && state.flight.filterCountTravel.oneTravel){
        tempFlight = [...tempFlight.filter((item) => item.flight.legs[0].segments.length > 1)]
        tempFlight = [...tempFlight.filter((item) => item.flight.legs[1].segments.length > 1)]
    }
    switch (state.flight.sortBy) {
        case BY_ASCENDING_PRICE:
            tempFlight.sort((a, b) => {
                return a.flight.price.total.amount - b.flight.price.total.amount
            })
            break
        case BY_DESCENDING_PRICE:
            tempFlight.sort((a, b) => {
                return b.flight.price.total.amount - a.flight.price.total.amount
            })
            break
        case BY_TRAVEL_TIME:
            tempFlight.sort((a, b) => {
                return (a.flight.legs[0].duration + a.flight.legs[1].duration) -
                    (b.flight.legs[0].duration + b.flight.legs[1].duration)
            })
            break
        default:
            break
    }
    return tempFlight
}
export const getIsLoading = (state: RootState): boolean => {
    return state.flight.isLoading
}
export const getErrorMessage = (state: RootState): string => {
    return state.flight.errorMessage
}
export const getFilterPrice = (state: RootState): any => {
    return state.flight.filterPrice
}
export const getFilterCountTravel = (state: RootState)=>{
    return state.flight.filterCountTravel
}
export const getSortBy = (state: RootState): TSortBy => {
    return state.flight.sortBy
}
export const getActiveCarriers = (state: RootStateOrAny): string[] => {
    return state.flight.activeCarriers
}
export const getSelectedCarriers = (state: RootStateOrAny): string[] => {
    return state.flight.selectedCarriers
}