import React from "react";
import { useState, useEffect } from "react";
import { FormView, FormViews } from "../../types/ui";
import { StepperForm } from "../widgets/forms/stepper-form";
import { Outlet } from "react-router-dom";

export const CHCForm = () => {
  const [showToggle, setShowToggle] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.split("/").includes("loan_chc")) setShowToggle(true);
    else setShowToggle(false);
  }, [location]);

  const steps: FormViews = [
    // { title: "Select Collateral", widget: "" },
    // { title: "Vault Management", widget: "vault" },
    // { title: "Generate CHC", widget: "dai" },
    // { title: "Confirmation", widget: "confirmation" },
  ];
  const [_selectedView, _setSelectedView] = useState<FormView>(steps[0]);
  return (
    <>
      {/* <div className="p-4 d-flex flex-row justify-content-between align-items-center">
				<CToggle
					options={[
						{ value: "loan", label: "LOAN" },
						{ value: "loan", label: "LOAN" },
					]}
					setSelected={() => { }}
				/>
			</div> */}
      <StepperForm callback={_setSelectedView} steps={steps}>
        <Outlet />
      </StepperForm>
      {/* <Outlet /> */}
    </>
  );
};
