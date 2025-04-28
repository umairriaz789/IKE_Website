import React from "react"
import { Button } from "reactstrap";

interface IRoundedPillButtonProps {
	color: string;
	text: string;
	style?: any;
	outline?: boolean;
	className?: string;
}

export const RoundedPillButton = ({
	color,
	text,
	style,
	outline,
	className,
}: IRoundedPillButtonProps) => {
	return (
		<Button
			className={`rounded-pill px-4 py-2 ${className}`}
			color={color}
			outline={outline}
			style={{
				fontStyle: "normal",
				fontWeight: "700",
				fontSize: "12px",
				lineHeight: "16px",
				...style,
			}}
		>
			{text}
		</Button>
	);
};
