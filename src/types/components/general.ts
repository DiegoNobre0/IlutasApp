import { IButtonProps } from "native-base";

export type ButtonProps = {
  variant?: "primary" | "secondary";
} & IButtonProps;

export type StepperProps = {
  currentStep: number;
  totalSteps: number;
};
