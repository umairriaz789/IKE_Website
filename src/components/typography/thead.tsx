interface ITHeadProps {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
	style?: any;
}
export const THead = ({ children, className, style }: ITHeadProps) => {
	return (
		<th
			className={`thead ${className}`}
			style={{
				color: "#F2CB54",
				...style,
			}}
		>
			<>{children}</>
		</th>
	);
};
