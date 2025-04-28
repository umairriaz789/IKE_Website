import React, { useState } from "react";
import { Button } from "reactstrap";
import { Check } from "react-feather";

interface ICheckButtonProps {
	checked: boolean;
	title: string;
	callback: (checked: boolean) => void;
}

export const CheckButton = ({
	checked,
	title,
	callback,
}: ICheckButtonProps) => {
	const [_checked, _setChecked] = useState<boolean>(checked || false);
	return (
		<Button
			color="primary"
			onClick={(e) => {
				_setChecked(!_checked);
				callback(!_checked);
			}}
			outline={!_checked}
			style={{
				borderRadius: "40px",
				fontStyle: "normal",
				fontWeight: "700",
				fontSize: "12px",
				lineHeight: "16px",
				letterSpacing: "1px",
				textTransform: "uppercase",
			}}
		>
			{_checked === true && <Check color="white" />}
			{_checked === false && <Check color="#EDC452" />}
			<span style={{ color: "#EDC452" }}>
				{_checked === false ? title : ""}
			</span>
		</Button>
	);
};
