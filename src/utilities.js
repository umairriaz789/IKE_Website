import { ethers } from "ethers";
import chrysus from "./abis/Chrysus.json";
import ERC20 from "./abis/ERC20.json";
import loan from "./abis/MockLending.json";
import swap from "./abis/Swap.json";
import staking from "./abis/MockStabilityModule.json";
import mockOracle from "./abis/MockOracle.json";
import { DAI, ETH } from "./constant";
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { computePoolAddress } from '@uniswap/v3-sdk' 

const PROVIDER ="https://arbitrum-mainnet.infura.io/v3/ea5eca6e1a3f4128b92b5b0fc5441ed8";
// const PROVIDER = "wss://ethereum-sepolia.publicnode.com";
const LOAN = "0x31d169931622A6aD1ECa9112D490D11dbDf23201";
const CHRYSUS = "0x89fb8171f84f70F53d560618db9027f5b4786781";
const GOVERNANCE = "0xEE6fDb0cea3d26f0972700B697187420c9EaD906";
const oracleDAI = "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19";
const oracleETH = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const oracleCHC = "0x71028fb72e940ac5b01C8554C67A6b72e59EBd42";
const oracleXAU = "0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea";
const STAKE = "0x0CE76D0bf173F092fA8292A839a7BBFb9E47B7e7";
const provider = new ethers.providers.WebSocketProvider(
  "wss://ethereum-sepolia.publicnode.com/",
);
const chrysusContract = new ethers.Contract(CHRYSUS, chrysus.abi, provider);
const loanContract = new ethers.Contract(LOAN, loan.abi, provider);
const stakingContract = new ethers.Contract(STAKE, staking.abi, provider);

const getGovStake = async (address) => {
  return stakingContract.getGovernanceStake(address);
};

const getTotalStakeAmount = async () => {
  return stakingContract.getTotalPoolAmount();
};

const getReward = async (user) => {
  const userData = await stakingContract.getGovernanceStake(user);
  const totalAmount = await getTotalStakeAmount();
  const balance = await getUserBalance(GOVERNANCE, "CGT");
  return (userData.amount / totalAmount) * balance;
};

const getCollateralizationRatio = async () => {
  return chrysusContract.getCollateralizationRatio();
};

const getCDPCount = async () => {
  return chrysusContract.getCdpCounter();
};

const liqRatio = async () => {
  return chrysusContract.liquidationRatio();
};

const interestRate = async () => {
  return loanContract.calculateInterestRate();
};

const utilizationRate = async () => {
  return loanContract.calculateUtilizationRate();
};

const volume = async () => {
  return loanContract.getVolume();
};

const collateralAmount = async (amount, token) => {
  const oracleD = new ethers.Contract(oracleDAI, mockOracle.abi, provider);
  const D = await oracleD.latestRoundData();
  const oracleE = new ethers.Contract(oracleETH, mockOracle.abi, provider);
  const E = await oracleE.latestRoundData();
  const oracleC = new ethers.Contract(oracleCHC, mockOracle.abi, provider);
  const C = await oracleC.latestRoundData();

  const collateral = token == "DAI" ? Number(D[1]) : Number(E[1]);
  return ((amount * Number(C[1])) - (Number(C[1]/2))) / (collateral * 1E28);
};

const generate = async (amount, token) => {
  const oracleD = new ethers.Contract(oracleDAI, mockOracle.abi, provider);
  const D = await oracleD.latestRoundData();
  const oracleE = new ethers.Contract(oracleETH, mockOracle.abi, provider);
  const E = await oracleE.latestRoundData();
  const oracleC = new ethers.Contract(oracleCHC, mockOracle.abi, provider);
  const C = await oracleC.latestRoundData();
  const oracleX = new ethers.Contract(oracleXAU, mockOracle.abi, provider);
  const X = await oracleX.latestRoundData();

  const ratio = Number(C[1]) / Number(X[1]);
  const collateral = token == "DAI" ? Number(D[1]) : Number(E[1]);
  const min = token == "DAI" ? 267 : 120;
  let mint = (Number(amount) * collateral) / Number(C[1]);
  return (mint * 10000) / (ratio * min);
};

const getLendPosition = async (user, collateral) => {
  if (collateral == "DAI") {
    return loanContract.getUserPositions(user, DAI);
  } else if (collateral == "ETH") {
    return loanContract.getUserPositions(user, ETH);
  }
};

const getMintPosition = async (user, collateral) => {
  if (collateral == "DAI") {
    return chrysusContract.getUserPositions(user, DAI);
  } else if (collateral == "ETH") {
    return chrysusContract.getUserPositions(user, ETH);
  }
};

const getMintPositions = async () => {
  const positions = await chrysusContract.getPositions();
  let arr = [];
  let collateral = ["ETH", "DAI"];

  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < 2; j++) {
      const c = await getMintPosition(positions[i], collateral[j]);
      if (Number(c.minted) > 0) {
        arr.push({
          minted: c.minted,
          deposited: c.deposited,
          col: collateral[j],
          user: positions[i],
        });
      }
    }
  }

  return arr;
};

const getUserBalance = async (user, token) => {
  if (token == "CHC") {
    return chrysusContract.balanceOf(user);
  } else if (token == "DAI") {
    const tokenContract = new ethers.Contract(DAI, ERC20.abi, provider);
    return tokenContract.balanceOf(user);
  } else if (token == "ETH") {
    return provider.getBalance(user);
  } else if (token == "CGT") {
    const tokenContract = new ethers.Contract(GOVERNANCE, ERC20.abi, provider);
    return tokenContract.balanceOf(user);
  }
};


const getFeed = async (token) => {
  if (token == "DAI") {
    const oracle = new ethers.Contract(oracleDAI, mockOracle.abi, provider);
    return oracle.latestRoundData();
  } else if (token == "ETH") {
    const oracle = new ethers.Contract(oracleETH, mockOracle.abi, provider);
    return oracle.latestRoundData();
  } else if (token == "CHC") {
    const oracle = new ethers.Contract(oracleCHC, mockOracle.abi, provider);
    return oracle.latestRoundData();
  }
};

const toFixedNoRounding = function (number, n) {
  const factor = Math.pow(10, n);
  return Math.floor(number * factor) / factor;
};

export const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
export const currentPoolAddress = '0xAc7873820C531edC3cDe7f80e74B7b31464B38EA';

const Pools = async () => {
  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    PROVIDER
  )
  return poolContract
  // const [token0, token1, fee, liquidity, slot0] = await Promise.all([
  //   poolContract.token0(),
  //   poolContract.token1(),
  //   poolContract.fee(),
  //   poolContract.liquidity(),
  //   poolContract.slot0(),
  // ])
    // return {
    //     fee,
    //     liquidity,
    //     sqrtPriceX96: slot0[0],
    //     tick: slot0[1],
    // }

  // if (token == "CHC") {
  //   return chrysusContract.balanceOf(user);
  // } else if (token == "DAI") {
  //   const tokenContract = new ethers.Contract(DAI, ERC20.abi, provider);
  //   return tokenContract.balanceOf(user);
  // } else if (token == "ETH") {
  //   return provider.getBalance(user);
  // } else if (token == "CGT") {
  //   const tokenContract = new ethers.Contract(GOVERNANCE, ERC20.abi, provider);
  //   return tokenContract.balanceOf(user);
  // }
};

export default {
  getCollateralizationRatio,
  liqRatio,
  getUserBalance,
  getFeed,
  getCDPCount,
  getMintPosition,
  getMintPositions,
  getLendPosition,
  collateralAmount,
  volume,
  utilizationRate,
  interestRate,
  toFixedNoRounding,
  generate,
  getTotalStakeAmount,
  getGovStake,
  getReward,
  Pools
};
