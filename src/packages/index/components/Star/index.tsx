import { Canvas } from "@tarojs/components"
import { createSelectorQuery } from "@tarojs/taro"
import React, { useEffect, useMemo } from "react"
import { animate, init, touchEnd, touchMove, touchStart } from "./script"

const Star: React.FC = () => {

  useEffect(() => {
    let destory: (() => void) | null
    setTimeout(() => {
      const query = createSelectorQuery()
      query.select('#myCanvas').node().exec((res) => {
        const canvas = res[0].node
        destory = init(canvas);
        animate();
      })
    }, 0)
    return () => {
      destory && destory();
    }
  }, [])
  const { offsetX, offsetY } = useMemo(() => {
    const { innerHeight, innerWidth } = window;
    const offset = 220;
    const y = offset;
    const x = innerWidth / innerHeight * y;
    return { offsetX: x, offsetY: y };
  }, [])

  return <>
    <Canvas
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      type='webgl'
      id='myCanvas'
      style={{
        height: `calc(100vh + ${offsetY}px)`,
        width: `calc(100vw + ${offsetX}px)`,
        position: 'relative',
        bottom: `${offsetY}px`,
        right: `${offsetX / 2}px`,
      }}
    />
  </>
}
export default Star