import React from "react";
interface IBodyProps {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	style?: any;
}
export const Body = ({ children, className, style }: IBodyProps) => {
	return (
		<p
			className={`body ${className}`}
			style={{
				color: "#ffffff",
				...style,
			}}
		>
			<>{children}</>
		</p>
	);
};
