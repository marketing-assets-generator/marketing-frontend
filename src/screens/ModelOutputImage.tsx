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
      <h1>SIGMA</h1>
      <div className={'w-512 content-start justify-start flex-row relative origin-left object-left text-left'}>
        <text
          className={"text-blue-500 cursor-pointer"}
          onClick={() => navigate('/')}
        >
          처음으로
        </text>
      </div>
      <div
        className={"w-512 h-512 mt-5 relative"}>
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
        className={'content-center mt-2'}>
        <button
          className={'mr-2'}
          onClick={clearCanvas}
        >
          Clear
        </button>

        <select
          className={'mr-20'}
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>

        <button onClick={() => downloadFile(imageUrl, `generated-${modelOutputImageId}`)}>Download</button>
      </div>
      <div
        className={'content-center mt-2'}>
        <input
          className={'mr-2'}
          type="text"
          placeholder="수정할 프롬프트"
          onChange={(e) => setPrompt(e.target.value)}/>
        <button
          onClick={uploadCanvas}
        >
          캔버스 업로드
        </button>
      </div>
    </div>
  );
}
export default ModelOutputImage;
