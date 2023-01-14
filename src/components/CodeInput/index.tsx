import { useEffect, useRef, useState, useMemo } from "react";
import Input from "components/Input";
import { INITIAL_CODE_LENGTH } from 'constants/variables';
import "./styles.scss";

interface Props {
  length: number;
  handleCodeFilled: (code: string) => void
}

export default function CodeInput({
  length = INITIAL_CODE_LENGTH,
  handleCodeFilled
}: Props) {
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

  return (
    <div className="codeInputContainer">
      <p>Enter your code:</p>
      <div className="inputsWrap">
        {
          emptyCodeArray.map((_, index: number) => {
            return (
              <Input
                type={isHide ? "password" : "text"}
                value={code[index] ?? ""}
                key={index}
                ref={(element) => {
                  refs.current[index] = element;
                }}
                onKeyDown={handleKeyDown}
                onChange={onChange}
                onFocus={setFocus}
              />
            )
          })
        }
      </div>
      <button
        disabled={!code[0]}
        className="hideButton"
        onClick={handleHideClick}>{
          isHide ? "Show code" : "Hide code"}
      </button>
    </div>
  )
}
