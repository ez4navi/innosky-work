import { useState, useCallback } from 'react';
import CodeInputLength from 'components/CodeInputLength';
import './App.scss';
import CodeInput from "./components/CodeInput";
import { INITIAL_CODE_LENGTH } from './constants/variables';

function App() {
  const [codeLength, setCodeLength] = useState<number>(INITIAL_CODE_LENGTH);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const handleLengthInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setCodeLength(Number(value))
  }, [setCodeLength])

  const handleCodeFilled = (code: string) => {
    setIsFilled(!!code)
  }

  return (
    <div className="App">
      <CodeInputLength onChange={handleLengthInputChange} />
      <CodeInput handleCodeFilled={handleCodeFilled} length={codeLength ?? INITIAL_CODE_LENGTH} />
      {
        isFilled && (
          <p className="codeHint">Your code is filled</p>
        )
      }
    </div>
  );
}

export default App;
