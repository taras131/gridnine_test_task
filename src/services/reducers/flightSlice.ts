import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchFlights} from "../actions/flightActionCreators";
import {IFilterPrice, IFlight} from "../../models";
import {BY_ASCENDING_PRICE, BY_DESCENDING_PRICE, BY_TRAVEL_TIME, NONE} from "../../utils/const";

export interface IFilterAction {
    name: string
    value: number
}

export type TSortBy = typeof NONE | typeof BY_ASCENDING_PRICE | typeof BY_DESCENDING_PRICE | typeof BY_TRAVEL_TIME

export interface IFilterCountTravel {
    notTravel: boolean
    oneTravel: boolean
}

interface IFlightState {
    isLoading: boolean;
    errorMessage: string;
    flights: IFlight[];
    filterPrice: IFilterPrice,
    filterCountTravel: IFilterCountTravel,
    sortBy: TSortBy,
    activeCarriers: string[],
    selectedCarriers: string[]
}

const initialState: IFlightState = {
    isLoading: false,
    errorMessage: '',
    flights: [],
    filterPrice: {
        min: 0,
        max: 0
    },
    filterCountTravel: {
        notTravel: false,
        oneTravel: false
    },
    sortBy: NONE,
    activeCarriers: [],
    selectedCarriers: []
};

export const FlightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        changePriceFilter: (state, action: PayloadAction<IFilterAction>) => {
            if (action.payload.value >= 0) {
                state.filterPrice = {...state.filterPrice, [action.payload.name]: action.payload.value}
            }
        },
        setSortBy: (state, action: PayloadAction<TSortBy>) => {
            state.sortBy = action.payload
        },
        setFilterCountTravel: (state, action: PayloadAction<IFilterAction>) => {
            state.filterCountTravel = {...state.filterCountTravel, [action.payload.name]: !action.payload.value}
        },
        setActiveCarriers: (state, action: PayloadAction<string[]>) => {
            state.selectedCarriers = [...state.selectedCarriers.filter(item => action.payload.includes(item))]
            state.activeCarriers = action.payload
        },
        setSelectedCarriers: (state, action: PayloadAction<string>) => {
            if (state.selectedCarriers.includes(action.payload)) {
                state.selectedCarriers = [...state.selectedCarriers.filter(item => item !== action.payload)]
            } else {
                state.selectedCarriers = [...state.selectedCarriers, action.payload]
            }
        },
    },
    extraReducers: {
        [fetchFlights.fulfilled.type]: (state, action: PayloadAction<IFlight[]>) => {
            state.flights = action.payload;
            state.isLoading = false;
        },
        [fetchFlights.pending.type]: (state) => {
            state.isLoading = true;
            state.errorMessage = '';
        },
        [fetchFlights.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        },
    },
});

export const {
    changePriceFilter,
    setSortBy,
    setFilterCountTravel,
    setActiveCarriers,
    setSelectedCarriers
} = FlightSlice.actions;
export default FlightSlice.reducer;