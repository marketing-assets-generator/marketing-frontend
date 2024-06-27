import {useParams} from "react-router-dom";
import {baseUrl} from "../common/Api.tsx";

const ImageModification = () => {
  const params = useParams()

  const modelOutputImageModificationId = params.modelOutputImageModificationId as unknown as number
  const imageUrl = `${baseUrl}/modelOutputImages/1/modifications/${modelOutputImageModificationId}/bytes`

  return (
    <div>
      <h1>Image Modification</h1>
      <div>
        <img
          className="w-512 h-512"
          src={imageUrl}
          alt="Generated Image"/>
      </div>
    </div>
  );
}

export default ImageModification;
