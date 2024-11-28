import { useState } from 'react'
import axios from 'axios';

function App() {
  const [code, setCode] = useState('#include<stdio.h> \n\n int main() {  printf("Hello, World!"); }');
  const [loding, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const handleCode = () => {
    console.log(code);
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    // Ensure `\n` is handled properly for new lines
    setCode(value.replace(/\r?\n/g, '\n'));
  };

  const handleCodeAndRun = async () => {
    setError(null);
    setLoading(true);
    console.log(code);
    // respose = await axios.post("", code)
    const options = {
      method: 'POST',
      url: 'https://c-code-compiler.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': 'e70336b7f5mshfff2008d53ad7b5p1e6f50jsnde57c676b502',
        'x-rapidapi-host': 'c-code-compiler.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        code: code,
        version: 'latest'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setResponse(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <section
      className="bg-slate-800 w-full h-screen m-auto flex items-center justify-center"
    >
      <div
        className="bg-slate-800 w-[90%] md:w-[75%] h-screen m-auto flex flex-col items-center justify-center gap-4"
      >
        <button
          className="bg-blue-500 rounded-md px-4 py-2 text-white text-2xl"
          onClick={handleCodeAndRun}
        >
          Run
        </button>
        <textarea
          className="w-full h-[40%] px-2 py-1"
          name="code"
          id="code"
          value={code}
          onChange={handleCodeChange}
        ></textarea>
        <h1
          className="rounded-md px-4 py-2 text-white text-2xl bg-black"
        >
          Output
        </h1>
        <div
          className="w-full h-[40%] bg-slate-900 px-2 py-1"
        >
          {response ? <h1 className='text-green-500'>{response.output}</h1> : error ? <h1 className='text-red-500'>error: {error}</h1> : <h1 className='text-white'>No Error</h1>}
        </div>
      </div>
    </section>
  );
}

export default App;
