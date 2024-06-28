import {useNavigate, useParams} from "react-router-dom";
import {baseUrl} from "../common/Api.tsx";
import {downloadFile} from "../common/DownloadUtils.tsx";

const ImageModification = () => {
  const navigate = useNavigate();
  const params = useParams()

  const modelOutputImageModificationId = params.modelOutputImageModificationId as unknown as number
  const imageUrl = `${baseUrl}/modelOutputImages/1/modifications/${modelOutputImageModificationId}/bytes`

  return (
    <div className={"relative flex-col content-center"}>
      <h1>SIGMA</h1>
      <div className={'w-512 content-start justify-start flex-row relative origin-left object-left text-left'}>
        <text
          className={"text-blue-500 mr-2 cursor-pointer"}
          onClick={() => navigate('/')}
        >
          처음으로
        </text>
        <text
          className={"text-blue-500 cursor-pointer"}
          onClick={() => navigate(-1)}
        >
          뒤로
        </text>
      </div>
      <div
        className={"w-512 h-512 mt-5 relative"}>
        <img
          src={imageUrl}
          alt="Generated Image"/>
      </div>
      <div
        className={'content-center mt-2'}>
        <button onClick={() => downloadFile(imageUrl, `modified-${modelOutputImageModificationId}`)}>Download</button>
      </div>
    </div>
  );
}

export default ImageModification;
