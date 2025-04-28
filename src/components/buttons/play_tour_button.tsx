import React from "react";
import { PlayCircle } from "react-feather";
import { Button } from "reactstrap";

interface IIconButtonProps {
	style?: any;
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PlayTourButton = ({
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
				background: "linear-gradient(270deg,rgb(184, 61, 250) 0.26%,rgb(115, 109, 207) 99.99%,rgb(105, 59, 173) 100%),rgb(84, 13, 122)",
				borderRadius: "40px",
				...style,
			}}
			color="primary"
		>
			<span className="d-flex flex-row align-items-center justify-content-center">
				<span>Play Tour</span>
				<PlayCircle className="mx-2" color="black" />
			</span>
		</Button>
	);
};
