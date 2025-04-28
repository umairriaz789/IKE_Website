import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { HR } from "src/components/hr";

interface MintModalProps {
	showModal: boolean;
	body: React.ReactNode | React.ReactNode[];
}

export const MintModal = ({ showModal, body }: MintModalProps) => {
	const [modal, setModal] = useState<boolean>(false);
	const toggle = () => setModal(!modal);
	useEffect(() => {
		setModal(showModal);
	}, [showModal]);
	return (
		<div>
			<Modal isOpen={modal} toggle={toggle}>
				{/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
				<ModalBody>
					<div className="w-100">
						<div
							style={{
								width: "50%",
								marginLeft: "50%",
								transform: "translateX(-50%)",
							}}
						>
							<HR />
						</div>
					</div>
					<br />
					{body}
				</ModalBody>
				{/* <ModalFooter>
					<Button color="primary" onClick={toggle}>
						Do Something
					</Button>{" "}
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter> */}
			</Modal>
		</div>
	);
};
