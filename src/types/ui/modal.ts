export interface Modal {
    title: string;
    body: string;
}

export interface ModalLink {
    label: string;
    onClick: () => void;
}