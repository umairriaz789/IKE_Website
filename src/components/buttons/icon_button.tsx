import React from "react";

interface IIconButtonProps {
	Icon: any;
	text: string;
	className: string;
	uppercase: boolean;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const IconButton = ({
	Icon,
	text,
	uppercase,
	className,
	onClick,
}: IIconButtonProps) => {
	return (
		<div
			onClick={onClick}
			className={`d-flex flex-column align-items-center mt-5 ${className}`}
		>
			<div>{Icon}</div>
			<div
				className="mt-2"
				style={{
					fontSize: "14px",
					fontWeight: "600",
					lineHeight: "24px",
					letterSpacing: "1px",
					textAlign: "center",
					textTransform: uppercase === true ? "uppercase" : "none",
				}}
			>
				{text}
			</div>
		</div>
	);
};
