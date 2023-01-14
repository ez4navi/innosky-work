import { useState } from 'react';
import './App.css';
import CodeInput from "./components/CodeInput";
import { INITIAL_CODE_LENGTH } from './constants';

function App() {
  const [codeLength, setCodeLength] = useState(INITIAL_CODE_LENGTH);

  function handleOnCodeFull(code: string) {
    console.log(`code is : ${code}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <CodeInput setCodeIsFilled={handleOnCodeFull} length={codeLength} />
      </header>
    </div>
  );
}

export default App;
