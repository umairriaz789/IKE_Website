import { useState } from "react";
import { CSelectOption } from "../../types/ui";
import {CheckPrimary} from "../../assets";

interface ICSelectProps {
	defaultLabel: string;
	options: CSelectOption[];
	optionsLabel: string;
	className?: string;
	style?: React.CSSProperties;
}

export const CSelect = ({
	defaultLabel,
	optionsLabel,
	options,
	className,
	style,
}: ICSelectProps) => {
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<CSelectOption>();
	const handleSelection = (option: CSelectOption) => {
		setSelectedOption(option);
		setShowOptions(false);
	};
	return (
		<>
			<div className={`c-select ${className}`} style={style}>
				<div className="select" onClick={() => setShowOptions(true)}>
					{selectedOption ? selectedOption.title : defaultLabel}
				</div>
				{showOptions ? (
					<div className="options">
						<div className="p-4 w-100 text-center">
							<h4 className="primary-gradient-text">
								{optionsLabel}
							</h4>
						</div>
						{options.map((option) => (
							<div className="option" onClick={() => handleSelection(option)}>
								<div className="left-section">
									<div className="icon-section">{option.icon}</div>
									<div className="text-section">
										<div className="title"> {option.title} </div>
										<div
											className={`subtitle ${
												option === selectedOption ? "selected" : ""
											}`}
										>
											{option.subTitle}
										</div>
									</div>
								</div>
								<div className="right-section">
									{option === selectedOption ? (
										<img src={CheckPrimary} alt="check-primary" />
									) : (
										""
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};
