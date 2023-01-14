import Input from 'components/Input';
import "./styles.scss";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CodeInputLength = ({ onChange }: Props) => {
  return (
    <div className="inputWrap">
      <p className="hint">Enter code input length:</p>
      <Input className="lengthInput" onChange={onChange} />
    </div>
  )
}
export default CodeInputLength;