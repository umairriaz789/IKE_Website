import { configureStore } from "@reduxjs/toolkit";
import parentReducer from "./parentReducer";
import {useSelector ,useDispatch} from 'react-redux';


const store = configureStore({
    reducer: parentReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false})

})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export default store;