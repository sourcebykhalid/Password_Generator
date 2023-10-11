// import React from "react";
import { useState, useCallback, useRef } from "react";

//password generated
const PasswordGen = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) str += "00123456789";
    if (charAllowed) str += "~!@#%$^&*()'";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 14);
    navigator.clipboard.writeText(`${password}`);
  }, [password]);
  // useEffect(() => {}, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="flex flex-col max-w-md mx-auto shadow-4xl shadow-2xl rounded-lg p-8 px-4 my-8 text-lg font-bold text-slate-700 bg-slate-400 min-h-fit">
      <h1 className="text-center text-black bg-emerald-300 p-2 rounded-lg   text-3xl my-8 font-extrabold">
        Password Generator
      </h1>
      <div className="flex shadow overflow-hidden mb-3">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password generated here!"
          readOnly
          ref={passwordRef}
        />
        <i
          className="fa-regular fa-copy outline-none bg-blue-700 text-white px-3 py-2.5 shrink-0 cursor-pointer"
          onClick={copyPasswordToClipboard}
        ></i>
      </div>

      <div className="flex items-center gap-x-1 mx-24 my-3 shadow-4xl">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label>Length: {length}</label>
      </div>
      <div className=" flex items-center gap-x-1 mx-28 my-3 shadow-4xl">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="numberInput">Include Numbers</label>
      </div>
      <div className=" flex items-center gap-x-1 mx-28 my-3 shadow-4xl">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor="charInput"> Include Characters</label>
      </div>

      <div className="flex items-center gap-x-1 mx-24 my-6 shadow-4xl">
        <button
          className="gap-x-1 bg-green-400 text-black p-2 px-6 rounded-md font-medium"
          onClick={passwordGenerator}
        >
          Generate password
        </button>
      </div>
    </div>
  );
};

export default PasswordGen;
