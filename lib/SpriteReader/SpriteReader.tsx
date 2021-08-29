import { useRef, useState, useEffect } from "react";

export default function SpriteReader({
  linkImg,
  width = 50,
  height = 50,
}: {
  linkImg: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef(null),
    [read, setRead] = useState(true);

  useEffect(() => handleRead(), []);

  /**
   * mettre le set intervale et le clear autre part
   * permettre le controle avec un timeout et un nombre de lecture
   */

  function handleRead() {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    img.setAttribute("src", linkImg);
    ctx.drawImage(img, 0, 0);

    let diapo = 0;
    const interVal = setInterval(() => {
      ctx.drawImage(img, diapo, 0);
      diapo += -width;
      if (img.width + diapo === 0) {
        diapo = 0;
      }
    }, 100);
    if (!read) {
      clearInterval(interVal);
    }
  }

  return <canvas ref={ref} width={width} height={height} />;
}
