import { useEffect, useRef } from "react"

export default function DigitalTwinCanvas({ stress }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
    let angle = 0

    function draw() {
      ctx.clearRect(0,0,400,400)
      ctx.save()
      ctx.translate(200,200)
      ctx.rotate(angle)

      ctx.fillStyle =
        stress > 70 ? "#ef4444" :
        stress > 50 ? "#facc15" :
        "#22c55e"

      ctx.beginPath()
      ctx.arc(0,0,80,0,Math.PI*2)
      ctx.fill()

      ctx.restore()
      angle += 0.01
      requestAnimationFrame(draw)
    }

    draw()
  }, [stress])

  return <canvas ref={ref} width={400} height={400}/>
}
