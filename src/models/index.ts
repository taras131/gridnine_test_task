export interface ICarrier{
    airlineCode: string,
    caption: string,
    uid: string
}
export interface IExchange{
    ADULT: any
}
export interface IPrice {
    passengerPrices: any,
    rates: any,
    total: any,
    totalFeeAndTaxes: any
}
export interface ISegment{
    aircraft: any,
    airline: any,
    arrivalAirport: any,
    arrivalCity: any,
    arrivalDate: string,
    classOfService: any,
    classOfServiceCode: string,
    departureAirport: any,
    departureCity: any,
    departureDate: string,
    flightNumber: string,
    servicesDetails: any,
    starting: boolean,
    stops: number,
    techStopInfos: any,
    travelDuration: number,
}
export interface ILeg {
    duration: number,
    segments: ISegment[]
}
export interface IFlightItem {
    carrier: ICarrier,
    exchange: IExchange,
    international: boolean,
    isTripartiteContractDiscountApplied: boolean,
    legs: ILeg[],
    price: IPrice,
    refund: any,
    seats: any,
    servicesStatuses: any
}
export interface IFlight {
    hasExtendedFare: boolean
    flightToken: string
    flight: IFlightItem
}
export interface IFilterPrice {
    min: number
    max: number
}