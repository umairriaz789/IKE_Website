import { PrimaryGradientButton } from "src/components/buttons";
import { CInput } from "src/components/inputs/cinput";
import { CSelect } from "src/components/select";
import { MintModal } from "src/widgets/mint_modal";
import TransferBlack from "src/assets/icons/svg/transfer-black.svg";
import Chrysus from "src/assets/icons/svg/chrysus.svg";
import CWhite from "src/assets/icons/svg/coins/c-white.svg";
import ETHWhite from "src/assets/icons/svg/coins/eth-white.svg";
import DAIWhite from "src/assets/icons/svg/coins/dai-white.svg";
import XRPWhite from "src/assets/icons/svg/coins/xrp-white.svg";
import XLMWhite from "src/assets/icons/svg/coins/xlm-white.svg";
import USDTWhite from "src/assets/icons/svg/coins/usdt-white.svg";
import SearchBlack from "src/assets/icons/svg/search-black.svg";
import ProductModalBanner from "src/assets/icons/svg/product-modal-banner.svg";
import { CSelectOption } from "src/types/ui";

interface ISwapModalProps {
	showSwapModal: boolean;
}

export const SwapModal = ({ showSwapModal }: ISwapModalProps) => {
	return (
		<MintModal
			showModal={showSwapModal}
			body={
				<div className="d-flex flex-column align-items-center justify-content-start">
					<h2 className="primary-gradient-text">Swap Chrysus Coin (CHC)</h2>
					<CInput
						placeholder="Swap From"
						className="mt-3"
						type="text"
						outline="FORM"
						rightIcon={<img width={15} src={Chrysus} alt="chrysus" />}
						bottomLeftText={<span>Amount Available</span>}
						bottomRightText={<span className="fw-bold">CHC: 00000032</span>}
					/>
					<CInput
						placeholder="Enter Amount"
						className="mt-3"
						type="text"
						outline="PRIMARY"
						leftIcon={<img width={15} src={CWhite} alt="c-white.svg" />}
					/>
					<CSelect
						className="mt-3"
						defaultLabel="Swap To"
						options={swapOptions}
						optionsLabel="Mint Option"
					/>
					<PrimaryGradientButton onClick={(event: any) => {}} className="mt-3">
						<div className="d-flex flex-row align-items-center justify-content-center">
							Swap CHC
							<img
								className="mx-2"
								src={TransferBlack}
								alt="transfer-black.svg"
							/>
						</div>
					</PrimaryGradientButton>
				</div>
			}
		/>
	);
};

const swapOptions: CSelectOption[] = [
	{
		icon: <img src={ETHWhite} alt="eth-white" />,
		title: "ETH",
		subTitle: "Ethereum",
	},
	{
		icon: <img src={DAIWhite} alt="dai-white" />,
		title: "DAI",
		subTitle: "MakerDAO",
	},
	{
		icon: <img src={DAIWhite} alt="bch-white" />,
		title: "BCH",
		subTitle: "Bitcoin Cash",
	},
	{
		icon: <img src={XRPWhite} alt="xrp-white" />,
		title: "XRP",
		subTitle: "Ripple",
	},
	{
		icon: <img src={XLMWhite} alt="xlm-white" />,
		title: "XRP",
		subTitle: "Stellar Lumens",
	},
	{
		icon: <img src={USDTWhite} alt="usdt-white" />,
		title: "USD₮",
		subTitle: "Teather (SLP)",
	},
];
