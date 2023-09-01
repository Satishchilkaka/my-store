import { Checkbox, FormControl } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { setCookie, removeCookie, getCookie } from '../../util/cookie'

interface RememberMeCheckboxProps {
  onToggle: (isChecked: boolean) => void;
}

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({ onToggle }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const rememberedUser = getCookie("rememberedUser");
    if (rememberedUser === "true") {
      setIsChecked(true);
      onToggle(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);

    if (!isChecked) {
      setCookie("rememberedUser", "true");
    } else {
      removeCookie("rememberedUser");
    }
  };

  return (
    <FormControl mb={2}>
      <Checkbox
        name="rememberMe"
        isChecked={isChecked}
        onChange={handleCheckboxChange}
      >
        Remember Me
      </Checkbox>
    </FormControl>
  );
};

