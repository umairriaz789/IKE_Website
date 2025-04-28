import { combineReducers } from "@reduxjs/toolkit";
import { web3Reducer } from "../slices/web3ContractSlice";

const parentReducer = combineReducers({
    web3Connect : web3Reducer,

})

export default parentReducer;