import LogoSVG from "src/assets/images/logo.svg";
// icons
import {
  Cpu,
  Feather,
  Repeat,
  // Umbrella,
  ShoppingCart,
  CreditCard,
} from "react-feather";
import { IconButton } from "src/components/buttons";
import { CPU } from "src/assets/icons/cpu";
import { COLORS } from "src/assets/styles/theme";
import { Leaf } from "src/assets/icons/leaf";
import { Transfer } from "src/assets/icons/transfer";
import { Umbrella } from "src/assets/icons/umbrella";
import { Cart } from "src/assets/icons/cart";
import { Wallet } from "src/assets/icons/wallet";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SwapModal } from "../modals/swap-modal";
import { ShopModal } from "../modals/shop-modal";

export const CLeftBar = () => {
  const [swapModal, setSwapModal] = useState<boolean>(false);
  const [shopModal, setShopModal] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {}, [setSwapModal, setShopModal]);
  const IconButtons: CLeftbarIconButton[] = [
    // { icon: <Cpu color="white" size={24} />, text: "Cpu" },
    {
      icon: (
        <CPU fill="none" stroke={COLORS.white} hoverStroke={COLORS.primary} />
      ),
      text: "Cpu",
      url: "dash2",
    },
    {
      icon: (
        <Leaf fill="none" stroke={COLORS.white} hoverStroke={COLORS.primary} />
      ),
      text: "Mint",
      url: "mint_chc",
    },
    {
      icon: (
        <Transfer
          fill="none"
          stroke={COLORS.white}
          hoverStroke={COLORS.primary}
        />
      ),
      text: "Transfer",
      modal: "swap",
    },
    {
      icon: (
        <Umbrella
          fill="none"
          stroke={COLORS.white}
          hoverStroke={COLORS.primary}
        />
      ),
      text: "Loan",
      url: "loan_chc",
    },
    {
      icon: (
        <Cart fill="none" stroke={COLORS.white} hoverStroke={COLORS.primary} />
      ),
      text: "Cart",
      modal: "shop",
    },
    // { icon: <Feather color="white" size={24} />, text: "Mint" },
    // { icon: <Repeat color="white" size={24} />, text: "Transfer" },
    // { icon: <Umbrella color="white" size={24} />, text: "Umbrella" },
    // { icon: <ShoppingCart color="white" size={24} />, text: "Cart" },
  ];
  const [_selected, _setSelected] = useState<CLeftbarIconButton>(
    IconButtons[0]
  );
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between pt-2 pb-2 bg-leftbar-background"
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div className="pt-3">
        <img src={LogoSVG} width={24} height={33} alt="logo" />
      </div>
      <div>
        {IconButtons.map((_, key) => (
          <IconButton
            onClick={() => {
              if (_.url !== undefined) {
                navigate(_.url);
                _setSelected(_);
              }
              if (_.modal === "swap") setSwapModal(true);
              if (_.modal === "shop") setShopModal(true);
            }}
            uppercase
            key={key}
            className={`icon-button ${_selected === _ ? "bg-primary" : ""}`}
            Icon={_.icon}
            text={_.text}
          />
        ))}
      </div>
      <div className="">
        <IconButton
          uppercase
          className="icon-button"
          // Icon={<CreditCard color="white" size={24} />}
          Icon={
            <Wallet
              fill="none"
              stroke={COLORS.white}
              hoverStroke={COLORS.primary}
            />
          }
          text=""
        />
      </div>
      <SwapModal showSwapModal={swapModal} />
      <ShopModal showShopModal={shopModal} />
    </div>
  );
};

interface CLeftbarIconButton {
  icon: any;
  text: string;
  url?: string;
  modal?: string;
}
