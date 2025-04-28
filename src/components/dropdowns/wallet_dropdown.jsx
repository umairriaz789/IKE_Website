import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";



export const WalletDropdown = ({onChange, items }) => {
	return (
		<div className="d-flex p-5">
			<Input
				id="select_field"
				name="select"
				type="select"
				style={{
					fontStyle: "normal",
					fontWeight: "400",
					fontSize: "12px",
					lineHeight: "15px",
					color: "#FFFFFF",
					background: "transparent",
					outline: "none",
					border: "none",
					boxShadow: "none",
					cursor: "pointer",
					opacity: "0.5",
				}}
				onChange={(e) => onChange(e.target.value)}
			>
				{items.map((item) => (
					<option style={{ color: "#000" }}>{item}</option>
				))}
			</Input>
		</div>
	);
};
