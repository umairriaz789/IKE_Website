interface IH5Props {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
}
export const H5 = ({ children, className }: IH5Props) => {
	return (
		<h5 className={`h5 text-white ${className}`}>
			<>{children}</>
		</h5>
	);
};
