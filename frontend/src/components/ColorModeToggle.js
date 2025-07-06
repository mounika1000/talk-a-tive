import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      isRound
      size="md"
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      m={2}
    />
  );
};

export default ColorModeToggle;
