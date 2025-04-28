import Web3 from "web3";
import { CHRYSUS, DAI } from "../constant";
import CHRYSUS_ABI from "../abis/Chrysus.json";
import ERC20 from "../abis/ERC20.json";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";

export const initialState = {
  status: null,
  web3: null,
  socketContract: null,
  accounts: [],
  DAIContract: null,
  contract: null,
  balance: [],
  Provider: null,
  web3loadingerror: null,
};

export const loadBlockchain = createAsyncThunk(
  "loadBlockchain",
  async (_, thunkAPI) => {
    try {
      if (
        Web3.givenProvider &&
        Web3.givenProvider.chainId === Web3.utils.toHex(11155111)
      ) {
        const Provider = Web3.givenProvider;
        await Web3.givenProvider.enable();
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(CHRYSUS_ABI.abi, CHRYSUS);
        const accounts = await web3.eth.getAccounts();
        localStorage.setItem("accounts", accounts);
        localStorage.setItem("provider", Provider);
        const balance = await web3.eth.getBalance(accounts[0]);
        const DAIContract = new web3.eth.Contract(ERC20.abi, DAI);
        return {
          web3,
          balance,
          accounts,
          Provider,
          contract,
          DAIContract,
        };
      } else {
        try {
          await Web3.givenProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(11155111) }],
          });
        } catch (error) {
          if (error.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: Web3.utils.toHex(11155111),
                  chainName: "Sepolia test network",
                  rpcUrls: ["https://rpc.sepolia.org"],
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://sepolia.etherscan.io"],
                },
              ],
            });
          }
        }
        return {
          web3loadingerror: "errorloading",
        };
      }
    } catch (error) {
      console.log("Network ID error", error);
    }
  },
);

export const loadWalletConnect = createAsyncThunk(
  "loadWalletConnect",
  async (_, thunkAPI) => {
    try {
      const provider = new WalletConnectProvider({
        chainId: 11155111,
      });
      if (provider) {
        const Provider = provider;
        await provider.enable();
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        localStorage.setItem("accounts", accounts);
        localStorage.setItem("provider", Provider);
        const balance = await web3.eth.getBalance(accounts[0]);
        return {
          web3,
          accounts,
          balance,
          Provider,
        };
      } else {
        return {
          web3loadingerror: "errorloading",
        };
      }
    } catch (error) {
      console.log("error", error);
    }
  },
);

export const updatAccount = createAsyncThunk(
  "updatAccount",
  async (data, thunkAPI) => {
    try {
      let accounts = data;
      localStorage.setItem("accounts", data);
      return {
        accounts,
      };
    } catch (error) {
      console.log("error", error);
    }
  },
);

const web3ConnectSlice = createSlice({
  name: "web3Connect",
  initialState,
  reducers: {},
  extraReducers: {
    [loadBlockchain.pending.toString()]: (state, { payload }) => {
      state.status = "pending";
    },
    [loadBlockchain.fulfilled.toString()]: (state, { payload }) => {
      state.web3 = payload?.web3;
      state.accounts = payload?.accounts;
      state.contract = payload?.contract;
      state.DAIContract = payload?.DAIContract;
      state.socketContract = payload?.socketContract;
      state.balance = payload?.balance;
      state.Provider = payload?.Provider;
      state.status = "success";
    },
    [loadBlockchain.rejected.toString()]: (state, { payload }) => {
      state.status = "rejected";
    },

    [loadWalletConnect.fulfilled.toString()]: (state, { payload }) => {
      state.web3 = payload?.web3;
      state.accounts = payload?.accounts;
      state.contract = payload?.contract;
      state.balance = payload?.balance;
      state.DAIContract = payload?.DAIContract;
      state.Provider = payload?.Provider;
      state.status = "success";
    },
    [updatAccount.fulfilled.toString()]: (state, { payload }) => {
      state.accounts = payload?.accounts;
      localStorage.setItem("accounts", state.accounts);
    },
  },
});

export const web3Reducer = web3ConnectSlice.reducer;
