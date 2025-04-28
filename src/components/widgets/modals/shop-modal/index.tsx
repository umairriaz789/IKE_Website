import { PrimaryGradientButton } from "src/components/buttons";
import { CInput } from "src/components/inputs/cinput";
import { MintModal } from "src/widgets/mint_modal";
import SearchBlack from "src/assets/icons/svg/search-black.svg";
import ProductModalBanner from "src/assets/icons/svg/product-modal-banner.svg";

interface IShopModalProps {
  showShopModal: boolean;
}

export const ShopModal = ({ showShopModal }: IShopModalProps) => {
  return (
    <MintModal
      showModal={showShopModal}
      body={
        <div className="d-flex flex-column align-items-center justify-content-start">
          <h2 className="primary-gradient-text">
            Shopping easy with Chrysus Coin
          </h2>
          <CInput
            placeholder="Enter Product ASIN"
            className="mt-3"
            type="text"
            outline="PRIMARY"
          />
          <PrimaryGradientButton onClick={(event: any) => {}} className="mt-3">
            <div className="d-flex flex-row align-items-center justify-content-center">
              FETCH PRODUCT
              <img
                className="mx-2"
                src={SearchBlack}
                alt="transfer-black.svg"
              />
            </div>
          </PrimaryGradientButton>
          <div className="mt-3" />
          <img
            className="w-100"
            src={ProductModalBanner}
            alt="product-modal-banner"
          />
          <div className="mt-4" />
        </div>
      }
    />
  );
};
