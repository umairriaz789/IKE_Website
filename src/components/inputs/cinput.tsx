import React from "react"
import { Input } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import { InputOutline } from "../../types/ui";

interface CInputProps {
	type: InputType;
	dir?: string;
	rightText?: string;
	leftText?: string;
	rightIcon?: React.ReactNode;
	leftIcon?: React.ReactNode;
	outline?: InputOutline;
	className?: string;
	style?: React.CSSProperties;
	placeholder?: string;
	bottomLineText?: string;
	bottomLeftText?: React.ReactNode;
	bottomRightText?: React.ReactNode;
	topLineText?: string;
	topLeftText?: React.ReactNode;
	topRightText?: React.ReactNode;
}

export const CInput = ({
	type,
	dir,
	bottomLineText,
	bottomLeftText,
	bottomRightText,
	topLineText,
	topLeftText,
	topRightText,
	rightText,
	rightIcon,
	leftText,
	leftIcon,
	outline,
	className,
	style,
	placeholder,
}: CInputProps) => {
	return (
		<div className={`c-input ${className}`} style={style}>
			<div
				className={"mt-1 w-100"}
				style={{
					fontStyle: "normal",
					fontWeight: "400",
					fontSize: "12px",
					lineHeight: "16px",
					color: "#fff",
					opacity: "0.5",
				}}
			>
				{topLineText ? (
					topLineText
				) : (
					<div className="d-flex flex-row align-items-center justify-content-between">
						<div> {topLeftText} </div>
						<div> {topRightText} </div>
					</div>
				)}
			</div>
			<div
				className="control d-flex flex-row align-items-between"
				style={{
					border:
						outline === "FORM"
							? "1px solid rgba(255, 255, 255, 0.2)"
							: "1px solid #846424",
					borderRadius: "40px",
					background: "transparent",
				}}
			>
				<span
					className="d-flex flex-column justify-content-center align-items-center mx-3"
					style={{
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "12px",
						lineHeight: "16px",
						color: "#FFFFFF",
						opacity: "0.5",
					}}
				>
					{leftText}
					{leftIcon}
				</span>
				<Input
					type={type}
					dir={dir || "ltr"}
					style={{
						background: "transparent",
						color: "#fff",
						border: "none",
						outline: "none",
						boxShadow: "none",
						marginRight: 5,
					}}
					placeholder={placeholder}
				/>
				<span
					className="d-flex flex-column justify-content-center align-items-center mx-3"
					style={{
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "12px",
						lineHeight: "16px",
						color: "#FFFFFF",
						opacity: "0.5",
					}}
				>
					{rightText}
					{rightIcon}
				</span>
			</div>
			<div
				className={"mt-1 w-100"}
				style={{
					fontStyle: "normal",
					fontWeight: "400",
					fontSize: "12px",
					lineHeight: "16px",
					color: "#fff",
					opacity: "0.5",
				}}
			>
				{bottomLineText ? (
					bottomLineText
				) : (
					<div className="d-flex flex-row align-items-center justify-content-between">
						<div> {bottomLeftText} </div>
						<div> {bottomRightText} </div>
					</div>
				)}
			</div>
		</div>
	);
};
