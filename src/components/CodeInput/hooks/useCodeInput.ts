import { useEffect, useRef, useState, useMemo } from "react";
import { INITIAL_CODE_LENGTH } from 'constants/variables';

const useCodeInputHandler = (length: number, handleCodeFilled: (code: string) => void) => {
  const [code, setCode] = useState<string[]>([]);
  const [isHide, setHide] = useState<boolean>(true);

  const refs = useRef(Array(isNaN(length) ? INITIAL_CODE_LENGTH : length));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (event.key === "Backspace") {
      return setCode((currentCode) => currentCode.slice(0, currentCode.length - 1));
    }

    if (!isNaN(Number(event.key)) && code.length < (length ?? INITIAL_CODE_LENGTH)) {
      return setCode((currentCode) => [...currentCode, event.key]);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  const handleHideClick = () => {
    setHide((isHide) => !isHide);
  }

  const setFocus = () => refs.current[code.length]?.focus();

  useEffect(() => {
    if (refs.current[code.length]) {
      refs.current[code.length].focus();
    }
    if (code.length === length) {
      handleCodeFilled(code.join(""));
    }
  }, [code, length, handleCodeFilled]);

  const emptyCodeArray = useMemo(() => {
    return Array((isNaN(length) || !length) ? INITIAL_CODE_LENGTH : length).fill(null)
  }, [length])

  return {
    handleKeyDown,
    setFocus,
    handleHideClick,
    onChange,
    emptyCodeArray,
    isHide,
    refs,
    code,
  }
}

export default useCodeInputHandler