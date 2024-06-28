import {useState} from 'react'
import '../App.css'
import {api} from "../common/Api.tsx";
import {useNavigate} from "react-router-dom";

const App = () => {
  const [prompt, setPrompt] = useState<string>()

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const removeImage = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
  }

  const holdImage = (file: File | null | undefined) => {
    if (!file) {
      removeImage();
      return;
    }

    setImageFile(file);

    const fileRead = new FileReader();
    fileRead.onload = function () {
      setImagePreview(fileRead.result as string);
    };

    fileRead.readAsDataURL(file);
  };

  const uploadImageOnceIfHeld = async (file: File | undefined) => {
    if (!file)
      return undefined;

    const formData = new FormData();
    formData.append('file', file);
    return api
      .post('/originalImages', formData)
      .then(({data}) => {
        const originalImageId = data.id;
        console.log('originalImageId:', originalImageId)
        return originalImageId;
      });
  }

  const createModelOutputImage = async () => {
    if (!prompt) {
      alert("프롬프트를 입력해주세요")
      return
    }

    const uploadedOriginalImageId = await uploadImageOnceIfHeld(imageFile);

    api.post('/modelOutputImages', {prompt, originalImageId: uploadedOriginalImageId},)
      .then(({data}) => {
        const modelOutputImageId = data.id;
        console.log('modelOutputImageId:', modelOutputImageId)
        navigate(`/model-output/${modelOutputImageId}`)
      })
  }

  return (
    <div
      className={'flex-col'}>
      <h1>SIGMA</h1>
      <div
        className={'mt-5'}
      >
        <text
        >힌트 이미지를 제공해주실 경우 더 예쁜 스티커를 생성할 수 있습니다.
        </text>
      </div>
      <div
        className={'w-512 relative items-center mt-5 justify-center content-center self-center'}>
        {imagePreview && <img alt={imagePreview} src={imagePreview} width={250} height={250}/>}
        <input
          accept={"image/*"}
          type="file"
          onChange={(e) => holdImage(e.target.files?.item(0))}/>
      </div>
      <div>
        <input
          className={'mr-1'}
          type="text"
          placeholder="Prompt"
          onChange={(e) => setPrompt(e.target.value)}/>
        <button onClick={createModelOutputImage}>생성
        </button>
      </div>
    </div>
  )
}

export default App
