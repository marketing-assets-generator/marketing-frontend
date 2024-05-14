import {useState} from 'react'
import './App.css'

function App() {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

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

  const uploadImageIfHeld = async (file: File | undefined) => {
    if (!file)
      return;

    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      body: formData,
    });
    console.log(response);
  }

  return (
    <>
      <h1>노려라 금손</h1>
      <div>
        {imagePreview && <img alt={imagePreview} src={imagePreview} width={250} height={250}/>}
      </div>
      <div>
        <input
          accept={"image/*"}
          type="file"
          onChange={(e) => holdImage(e.target.files?.item(0))}/>
        <button onClick={() => uploadImageIfHeld(imageFile)}>Upload</button>
      </div>
    </>
  )
}

export default App
