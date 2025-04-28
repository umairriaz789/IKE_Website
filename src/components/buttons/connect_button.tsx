import React from 'react';
import { Button } from "reactstrap";
import { Wallet } from "../../assets/wallet";
import { COLORS } from "../../assets/styless/theme";

interface IConnectButtonProps {
	label: string;
	className?: string;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const ConnectButton = ({
	label,
	onClick,
	className,
}: IConnectButtonProps) => (
	<div
		className={`d-flex flex-row align-items-center justify-content-between ${className}`}
		style={{
			background:
				"linear-gradient(153.13deg, #846424 17.05%, #EDC452 49.23%, #846424 82.83%)",
			padding: "2px",
			borderRadius: "40px",
			marginRight:"40px",
		}}
	>
		<Button
			color="primary"
			onClick={onClick}
			style={{
				borderRadius: "40px",
				background: "#262522",
				width: "100%",
				// width: "150px",
				// height:"40px"
				
			}}
		>
			<span
				className="text-primary"
				style={{
					fontStyle: "normal",
					fontWeight: "700",
					fontSize: "12px",
					lineHeight: "16px",
					letterSpacing: "1px",
					textTransform: "uppercase",
					color: "#846424",
					marginLeft: "30px",
				}}
			>
				{label}
			</span>
			<span className="mx-2">
				<Wallet
					fill="none"
					stroke={COLORS.primary}
					hoverStroke={COLORS.primary}
				/>
			</span>
		</Button>
	</div>
);
