import {useState} from 'react'
import './App.css'
import {api} from "./Api.tsx";

function App() {
  const [image, setImage] = useState('');
  const [prompt, setPrompt] = useState<string>()

  return (
    <>
      <h1>노려라 금손</h1>
      <div
        className={'items-center'}>
        <input
          type="text"
          placeholder="Prompt"
          onChange={(e) => setPrompt(e.target.value)}/>
        <button onClick={() => {
          if (!prompt) {
            alert("모든 항목을 입력해주세요")
            return
          }

          api.post('/model/test', {prompt}, {
            responseType: "arraybuffer"
          })
            .then(({data}) => {
              const base64 = btoa(
                new Uint8Array(data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )
              setImage(base64)
            })
        }}>제출
        </button>
      </div>
      <div
        className={'max-w-fit content-center'}>
        <img
          src={`data:;base64,${image}`}
          alt="Generated Image"/>
      </div>
    </>
  )
}

export default App
