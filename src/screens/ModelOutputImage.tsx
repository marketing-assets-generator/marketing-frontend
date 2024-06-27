import {downloadFile} from "../common/DownloadUtils.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {api, baseUrl} from "../common/Api.tsx";
import {useState} from "react";
import Canvas, {DrawnLine} from "../components/Canvas.tsx";

const ModelOutputImage = () => {
  const navigate = useNavigate();
  const params = useParams()

  const modelOutputImageId = params.modelOutputImageId as unknown as number

  const [prompt, setPrompt] = useState<string>()
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [lines, setLines] = useState<DrawnLine[]>([]);

  const imageUrl = `${baseUrl}/modelOutputImages/${modelOutputImageId}/bytes`

  const clearCanvas = () => {
    setLines([]);
  }

  const uploadCanvas = async () => {
    if (!prompt) {
      alert("프롬프트를 입력해주세요")
      return
    }

    const apiUrl = `/modelOutputImages/${modelOutputImageId}/modifications`
    const flattenPoints = lines.flatMap((line) => line.points)

    api.post(apiUrl, {flattenPoints, prompt})
      .then(({data}) => {
        const modelOutputImageModificationId = data.id;
        navigate(`/modification/${modelOutputImageModificationId}`);
      })
  }

  return (
    <div className={"relative flex-col content-center"}>
      <h1>Model Output Image</h1>
      <div
        className={"w-512 h-512 relative"}>
        <img
          className="w-512 h-512 relative"
          src={imageUrl}
          alt="Generated Image"/>
        <div
          className={"h-0 top-[-512px] relative"}>
          <Canvas
            tool={tool}
            lines={lines}
            setLines={setLines}
          />
        </div>
      </div>
      <div
        className={'content-center'}>
        <button onClick={() => downloadFile(imageUrl)}>Download</button>
      </div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <input
        type="text"
        placeholder="Prompt"
        onChange={(e) => setPrompt(e.target.value)}/>
      <button
        onClick={clearCanvas}
      >
        Clear
      </button>
      <button
        onClick={uploadCanvas}
      >
        캔버스 업로드
      </button>
    </div>
  );
}
export default ModelOutputImage;
