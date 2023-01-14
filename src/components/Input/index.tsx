import { forwardRef } from "react";
import clsx from "clsx";
import "./styles.scss"

interface Props {
  value?: string;
  onKeyDown?: React.KeyboardEventHandler;
  onChange?: React.ChangeEventHandler;
  onFocus?: React.FocusEventHandler;
  type?: string
  className?: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
  const { value, className } = props;

  return (
    <input {...props} className={clsx(className, "input", {
      filled: !!value
    })} ref={ref} />
  )
})

export default Input;