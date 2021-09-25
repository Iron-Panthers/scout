import { useState, useEffect } from "react";

export default function useWindowSize(debounce) {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {

    let timer

    function handleResize() {
      clearTimeout(timer)
      timer = setTimeout(() => setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      }), debounce ?? 300)
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [debounce]);
  return windowSize;
}