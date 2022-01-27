import {createAsyncThunk} from '@reduxjs/toolkit';
import {getDataFlights} from "../../http";

export const fetchFlights = createAsyncThunk(
    'fetch flights',
    async (_, ThunkAPI) => {
        try {
            const response = await getDataFlights();
            return response;
        } catch (e) {
            return ThunkAPI.rejectWithValue('Не загрузить данные');
        }
    },
);