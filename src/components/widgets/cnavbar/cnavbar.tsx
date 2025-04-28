import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Button } from "reactstrap";
import { User } from "react-feather";
interface CNavbarProps {
	theme: "light" | "dark";
	title: string;
	addons: React.ReactNode[];
}
export const CNavbar = ({ title, addons }: CNavbarProps) => {
	return (
		<Navbar  expand="md">
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				style={{ gap: "2em" }}
			>
				<NavbarBrand
					href="/"
					style={{
						fontStyle: "normal",
						fontWeight: "600",
						fontSize: "24px",
						lineHeight: "32px",
						color: "#FFFFFF",
					}}
				>
					{title}
				</NavbarBrand>
				{addons.map((addon) => addon)}
			</div>
			<NavbarToggler onClick={function noRefCheck() {}} />
			<div>
				<Button color="secondary" className="border-0 mx-2" outline>
					?
				</Button>
				<Button color="secondary" className="border-0" outline>
					<User color="gray" size={24} />
				</Button>
			</div>
		</Navbar>
	);
};
