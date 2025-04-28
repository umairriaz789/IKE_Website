export const ConfirmationItem = ({
	title,
	value,
}: {
	title: string;
	value: string;
}) => {
	return (
		<div
			className="d-flex flex-row align-items-center justify-content-between w-100 p-3"
			style={{
				boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.1)",
			}}
		>
			<div>{title}</div>
			<div>{value}</div>
		</div>
	);
};
