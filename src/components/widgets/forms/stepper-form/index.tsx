import React from "react";
import { useState } from "react";
import { Stepper } from "../../../stepper";
import { H3, H4 } from "../../../typography";
// import { PrimaryGradientText } from "src/components/text";
import { FormView, FormViews } from "../../../../types/ui";
interface IStepperFormProps {
	steps: FormViews;
	callback: any;
	children: React.ReactNode | React.ReactNode[];
}
export const StepperForm = ({
	steps,
	callback,
	children,
}: IStepperFormProps) => {
	return (
		<div className="text-center">
			<Stepper steps={steps} callback={callback} />
			<>{children}</>
		</div>
	);
};
