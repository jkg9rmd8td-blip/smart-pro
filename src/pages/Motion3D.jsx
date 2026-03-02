import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function PlayerModel() {
  return (
    <mesh rotation={[0, 0.5, 0]}>
      <boxGeometry args={[2, 4, 1]} />
      <meshStandardMaterial color="#00e0a4" />
    </mesh>
  );
}

export default function Motion3D() {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <PlayerModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
