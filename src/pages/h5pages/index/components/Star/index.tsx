import React, { useEffect, useMemo } from "react"
import { animate, init } from "./script"

const Star: React.FC = () => {

  useEffect(() => {
    let destory: (() => void) | null
    setTimeout(() => {
      const canvas = document.getElementById("myCanvas");
      destory = init(canvas);
      animate();
    }, 0)
    return () => {
      destory && destory();
    }
  }, [])
  const { offsetX, offsetY } = useMemo(() => {
    const { innerHeight, innerWidth } = window;
    const offset = 280;
    const y = offset;
    const x = innerWidth / innerHeight * y;
    return { offsetX: x, offsetY: y };
  }, [])

  return <>
    {/* eslint-disable-next-line react/forbid-elements */}
    <div
      id='myCanvas'
      style={{
        height: `calc(100vh + ${offsetY}px)`,
        width: `calc(100vw + ${offsetX}px)`,
        position: 'relative',
        bottom: `${offsetY}px`,
        right: `${offsetX / 2}px`,
      }}
    >
      <canvas style={{display: 'none'}}></canvas>
    </div>
  </>
}
export default Star