import { COLORS } from "src/assets/styles/theme";

interface ICRadioProps {
	name: string;
	checked: boolean;
	onChange: () => void;
}

export const CRadio = ({ name, checked, onChange }: ICRadioProps) => {
	return (
		<input
			type="radio"
			name={name}
			checked={checked}
			onChange={onChange}
			style={{ accentColor: "#EDC452", transform: "scale(1.5)" }}
		/>
	);
};
