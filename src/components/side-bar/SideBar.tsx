import React, {FC} from "react";
import sideBarStyles from "./SideBar.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {
    getActiveCarriers,
    getFilterCountTravel,
    getFilterPrice, getSelectedCarriers,
    getSortBy,
} from "../../services/selectors/flightSelectors";
import {
    changePriceFilter,
    setSortBy,
    setFilterCountTravel,
    setSelectedCarriers
} from "../../services/reducers/flightSlice";
import {BY_ASCENDING_PRICE, BY_DESCENDING_PRICE, BY_TRAVEL_TIME} from "../../utils/const";

const SideBar: FC = () => {
    const dispatch = useDispatch()
    const sortBy = useSelector((state: RootState) => getSortBy(state))
    const filterPrice = useSelector((state: RootState) => getFilterPrice(state))
    const filterCountTravel = useSelector((state: RootState) => getFilterCountTravel(state))
    const activeCarriers = useSelector((state: RootState) => getActiveCarriers(state))
    const selectedCarriers = useSelector((state: RootState) => getSelectedCarriers(state))
    const onCarriersChange = (e: any) => {
        dispatch(setSelectedCarriers(e.target.name))
    }
    const onSortByChange = (e: any) => {
        dispatch(setSortBy(e.target.name))
    }
    const onFilterPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        dispatch(changePriceFilter({name: e.target.name, value: +e.target.value}))
    }
    const onFilterCountTravelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterCountTravel({name: e.target.name, value: +e.target.value}))
    }
    const carriersList = activeCarriers.map(item => {
        return (
            <div key={item} className={sideBarStyles.sort_item}>
                <input
                    onChange={onCarriersChange}
                    checked={selectedCarriers.includes(item)}
                    type="checkbox"
                    name={item}
                    value={filterCountTravel.oneTravel ? 1 : 0}/>
                <p>- {item}</p>
            </div>
        )
    })
    return (
        <div className={sideBarStyles.wrapper}>
            <section className={sideBarStyles.side_bar_item}>
                <h3>Сортировать</h3>
                <form className={sideBarStyles.sort}>
                    <div className={sideBarStyles.sort_item}>
                        <input
                            onChange={onSortByChange}
                            checked={sortBy === BY_ASCENDING_PRICE}
                            type="radio"
                            name={BY_ASCENDING_PRICE}/>
                        <p> - по возврастанию цены</p>
                    </div>
                    <div className={sideBarStyles.sort_item}>
                        <input
                            onChange={onSortByChange}
                            checked={sortBy === BY_DESCENDING_PRICE}
                            type="radio"
                            name={BY_DESCENDING_PRICE}/>
                        <p>- по убыванию цены</p>
                    </div>
                    <div className={sideBarStyles.sort_item}>
                        <input
                            onChange={onSortByChange}
                            checked={sortBy === BY_TRAVEL_TIME}
                            type="radio"
                            name={BY_TRAVEL_TIME}/>
                        <p>- по времени в пути</p>
                    </div>
                </form>
            </section>
            <section className={sideBarStyles.side_bar_item}>
                <h3>Фильтровать</h3>
                <form className={sideBarStyles.sort}>
                    <div className={sideBarStyles.sort_item}>
                        <input
                            onChange={onFilterCountTravelChange}
                            checked={filterCountTravel.oneTravel}
                            type="checkbox"
                            name="oneTravel"
                            value={filterCountTravel.oneTravel ? 1 : 0}/>
                        <p>- 1 пересадка</p>
                    </div>
                    <div className={sideBarStyles.sort_item}>
                        <input
                            onChange={onFilterCountTravelChange}
                            checked={filterCountTravel.notTravel}
                            type="checkbox"
                            name="notTravel"
                            value={filterCountTravel.notTravel ? 1 : 0}/>
                        <p>- без пересадок</p>
                    </div>
                </form>
            </section>
            <section className={sideBarStyles.side_bar_item}>
                <h3>Цена</h3>
                <div className={sideBarStyles.sort}>
                    <div className={sideBarStyles.sort_item}>
                        <p>От</p>
                        <input
                            type="number"
                            name="min"
                            value={filterPrice.min}
                            onChange={onFilterPriceChange}/>
                    </div>
                    <div className={sideBarStyles.sort_item}>
                        <p>До</p>
                        <input
                            type="number"
                            name="max"
                            value={filterPrice.max}
                            onChange={onFilterPriceChange}/>
                    </div>
                </div>
            </section>
            <section className={sideBarStyles.side_bar_item}>
                <h3>Авиакомпания</h3>
                <form className={sideBarStyles.sort}>
                    {carriersList}
                </form>
            </section>
        </div>
    );
};

export default SideBar;