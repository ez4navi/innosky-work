import Input from "components/Input";
import { INITIAL_CODE_LENGTH } from 'constants/variables';
import useCodeInput from './hooks/useCodeInput';
import "./styles.scss";

interface Props {
  length: number;
  handleCodeFilled: (code: string) => void
}

export default function CodeInput({
  length = INITIAL_CODE_LENGTH,
  handleCodeFilled
}: Props) {
  const {
    handleKeyDown,
    setFocus,
    handleHideClick,
    onChange,
    emptyCodeArray,
    isHide,
    refs,
    code } = useCodeInput(length, handleCodeFilled)

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
