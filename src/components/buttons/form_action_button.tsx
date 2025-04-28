import React from "react";
import { Button } from "reactstrap";

interface IFormActionButton {
	color: string;
	outline?: boolean;
	children: React.ReactNode | React.ReactNode[];
	style?: any;
	gradient?: boolean;
	className?: string;
}

export const FormActionButton = ({
	color,
	outline,
	children,
	style,
	className,
	gradient,
}: IFormActionButton) => {
	return (
		<Button
			className={`pt-2 pb-2 pr-1 pl-1 ${className}`}
			color={color}
			outline={outline}
			style={{
				...style,
				borderRadius: "40px",
				background:
					gradient === true
						? "linear-gradient(270deg, #ac40ea 0.26%, #6b6bdf 99.99%, #bba9e7 100%),rgb(195, 198, 202)"
						: "transparent",
				// Fonts
				fontStyle: "normal",
				fontWeight: "700",
				fontSize: "14px",
				lineHeight: "24px",
				letterSpacing: "1px",
				textTransform: "uppercase",
				color: color === "primary" ? "black" : "white",
			}}
		>
			{children}
		</Button>
	);
};
