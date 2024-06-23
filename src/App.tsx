import {useState} from 'react'
import './App.css'
import {api, baseUrl} from "./Api.tsx";
import {downloadFile} from "./DownloadUtils.tsx";

function App() {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
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

          api.post('/modelOutputImages', {prompt},)
            .then(({data}) => {
              const id = data.id;
              const url = `${baseUrl}/modelOutputImages/${id}/bytes`
              console.log(url)
              setImageUrl(url)
            })
        }}>제출
        </button>
      </div>
      {
        imageUrl &&
          <div
              className={'max-w-fit content-center'}>
              <img
                  src={imageUrl}
                  alt="Generated Image"/>
              <button onClick={() => downloadFile(imageUrl)}>Download</button>
          </div>
      }
    </>
  )
}

export default App
