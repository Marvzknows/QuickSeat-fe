export type ListButtonProps = {
  text: string;
  onChangeHandler: (tabName: string) => void;
  isActive: boolean;
};

export type Option = {
  id: string;
  name: string;
};
