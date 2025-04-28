interface IH3Props {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
}
export const H3 = ({ children, className }: IH3Props) => {
	return (
		<h3 className={`h3 text-white ${className}`}>
			<>{children}</>
		</h3>
	);
};
