interface ICollateralProps {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
}
export const Collateral = ({ children, className }: ICollateralProps) => {
	return (
		<p className={`collateral-text text-primary ${className}`}>
			<>{children}</>
		</p>
	);
};
