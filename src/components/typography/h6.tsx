interface IH6Props {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
}
export const H6 = ({ children, className }: IH6Props) => {
	return (
		<h6 className={`h6 text-white ${className}`}>
			<>{children}</>
		</h6>
	);
};
