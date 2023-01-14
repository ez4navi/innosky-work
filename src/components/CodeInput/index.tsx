import React, { useEffect, useRef, useState, useMemo } from "react";
import Input from "components/Input";

interface Props {
  length: number;
  setCodeIsFilled: (code: string) => void
}

export default function CodeInput({
  length = 4,
  setCodeIsFilled
}: Props) {
  const [code, setCode] = useState<string[]>([]);
  const refs = useRef(Array(length));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (event.key === "Backspace") {
      return setCode((currentCode) => currentCode.slice(0, currentCode.length - 1));
    }

    if (!isNaN(Number(event.key)) && code.length < length) {
      return setCode((currentCode) => [...currentCode, event.key]);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  const setFocus = () => refs.current[code.length]?.focus();

  useEffect(() => {
    if (refs.current[code.length]) {
      refs.current[code.length].focus();
    }
    if (code.length === length) {
      setCodeIsFilled(code.join(""));
    }
  }, [code, length, setCodeIsFilled]);

  const emptyCodeArray = useMemo(() => {
    return Array(length).fill(null)
  }, [length])

  return (
    <>
      {
        emptyCodeArray.map((_, index: number) => (
          <Input
            value={code[index] ?? ""}
            key={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            onKeyDown={handleKeyDown}
            onChange={onChange}
            onFocus={setFocus}
          />
        ))
      }
    </>
  )
}
