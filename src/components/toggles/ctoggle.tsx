import React, { useState } from "react";
import { Button } from "reactstrap";
import { IOption } from "../../types/ui";

interface ICToggleProps {
	setSelected: (option: IOption) => void;
	options: IOption[];
}

export const CToggle = ({ setSelected, options }: ICToggleProps) => {
	const [_selected, _setSelected] = useState<IOption>(options[0]);
	return (
		<div
			style={{
				background:
					"linear-gradient(153.13deg, #846424 17.05%, #EDC452 49.23%, #846424 82.83%)",
				borderRadius: "40px",
				padding: "1px",
			}}
		>
			<div
				style={{
					background: "#1A1917",
					boxShadow:
						"0px 4px 8px rgba(0, 0, 0, 0.08), 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 0px 1px rgba(0, 0, 0, 0.14)",
					borderRadius: "40px",
				}}
			>
				{options.map((option) => {
					if (option.value === _selected.value) {
						return (
							<Button
								color="primary"
								style={{
									background: "transparent",
									border: "1px solid transparent",
									boxShadow: "none",
									borderRadius: "40px",
									outline: "none",
									letterSpacing: "1px",
									color: "#F2CB54",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "12px",
									lineHeight: "16px",
								}}
								onClick={() => {
									_setSelected(option);
									setSelected(option);
								}}
							>
								{option.label}
							</Button>
						);
					} else {
						return (
							<Button
								color="primary"
								style={{
									background:
										"linear-gradient(270deg, #FFD558 0.26%, #846424 99.99%, #846424 100%)",
									border: "1px solid #262522",
									boxShadow: "inset 0px 1px 2px rgba(0, 0, 0, 0.25)",
									borderRadius: "40px",
									letterSpacing: "1px",
									color: "#000000",
									fontStyle: "normal",
									fontWeight: "700",
									fontSize: "12px",
									lineHeight: "16px",
								}}
							>
								{option.label}
							</Button>
						);
					}
				})}
			</div>
		</div>
	);
};
