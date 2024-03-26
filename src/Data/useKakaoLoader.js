import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
      appkey: "749b1cd024618b540fe298604e8cdba8",
      libraries: ["clusterer", "drawing", "services"],
    })
  }