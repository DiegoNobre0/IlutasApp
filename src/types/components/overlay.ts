export type ModalBaseProps = {
  title: string;
  titleConfirm?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

export type ModalFullProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  styles?: any;
  blueArrow?: boolean;
};