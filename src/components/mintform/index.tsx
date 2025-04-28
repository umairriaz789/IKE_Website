import React from "react";
import { useState, useEffect } from "react";
import { Stepper } from "../stepper";
import { H4 } from "../typography";
import { FormView, FormViews } from "../../types/ui";
import { StepperForm } from "../widgets/forms/stepper-form";
import { Link, Outlet } from "react-router-dom";
import { CToggle } from "../toggles";
import { CNavbar } from "../widgets/cnavbar";

export const MintForm = () => {
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
			<StepperForm callback={_setSelectedView} steps={steps}>
				<Outlet />
			</StepperForm>
		</>
	);
};
