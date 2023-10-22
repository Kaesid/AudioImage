import { useState, useEffect } from "react";

const useBurger = (isMobile: boolean) => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const toggleBurger = () => setIsBurgerOpen(prevValue => !prevValue);
  const closeBurger = () => setIsBurgerOpen(false);

  useEffect(() => {
    if (!isMobile) closeBurger();
  }, [isMobile]);

  return { isBurgerOpen, closeBurger, toggleBurger };
};

export { useBurger };
