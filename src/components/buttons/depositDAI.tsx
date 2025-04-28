import React from "react";
import { PlayCircle } from "react-feather";
import { Button } from "reactstrap";

interface IIconButtonProps {
	style?: any;
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const DepositDAIButton = ({
	className,
	style,
	onClick,
}: IIconButtonProps) => {
	return (
		<Button
			className={`px-4 py-2 ${className}`}
			style={{
				color: "black",
				fontStyle: "normal",
				fontWeight: "700",
				fontSize: "16px",
				lineHeight: "34px",
				letterSpacing: "1px",
				textTransform: "uppercase",
				background: "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
				borderRadius: "40px",
				...style,
			}}
			color="primary"
		>
			<span className="d-flex flex-row align-items-center justify-content-center">
				<span>Deposit DAI</span>
				{/* <PlayCircle className="mx-2" color="black" /> */}
			</span>
		</Button>
	);
};
