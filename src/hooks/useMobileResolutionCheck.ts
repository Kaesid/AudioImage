import { useState, useEffect } from "react";
import { SCREEN_SIZES } from "../constants/screen";

const checkIsMobileScreen = () => {
  const { innerWidth } = window;
  return innerWidth < SCREEN_SIZES.MOBILE;
};

const useMobileResolutionCheck = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobileScreen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobileScreen());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export { useMobileResolutionCheck };
