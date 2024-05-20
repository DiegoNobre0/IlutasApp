import { Icon } from "react-native-paper";
import { Box, HStack } from "native-base";
import { StepperProps } from "../../types";

const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <Box className="h-[10px]">
      <HStack className="h-[1px] w-full bg-primaryLight relative justify-between">
        {new Array(totalSteps).fill(undefined).map((_, index) => (
          <Box
            key={index}
            className={`h-[20px] w-[20px] rounded-full justify-center items-center top-[-10px] ${
              currentStep >= index
                ? "bg-primaryLight"
                : "bg-background border border-primaryLight"
            } `}
          >
            {currentStep >= index && (
              <Icon source={"check"} size={14} color="#ffffff" />
            )}
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default Stepper;
