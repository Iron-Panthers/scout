import { useState } from "react"

export default function useAnim(newVal, ignore) {
  const [prev, setPrev] = useState("")
  const [anim, setAnim] = useState(0)

  if (newVal !== prev && !(ignore ?? false)) {
    setPrev(newVal)
    setAnim(1)
  }

  return [anim, () => setAnim(0)]
}
