export const motionTemplate = [
  // joints: head, neck, pelvis, lShoulder, rShoulder, lElbow, rElbow, lHand, rHand, lKnee, rKnee, lFoot, rFoot
  // coordinates in normalized space [-1..1]
  {
    name: "جري خفيف",
    frames: 120,
    joints(t) {
      const s = Math.sin(t);
      const c = Math.cos(t);
      return {
        head: { x: 0.0, y: 0.75 + 0.02 * s, z: 0 },
        neck: { x: 0.0, y: 0.58, z: 0 },
        pelvis: { x: 0.0, y: 0.15 + 0.03 * s, z: 0 },
        lShoulder: { x: -0.22, y: 0.52, z: 0 },
        rShoulder: { x: 0.22, y: 0.52, z: 0 },
        lElbow: { x: -0.38, y: 0.36 + 0.06 * s, z: 0 },
        rElbow: { x: 0.38, y: 0.36 - 0.06 * s, z: 0 },
        lHand: { x: -0.50, y: 0.20 + 0.10 * s, z: 0 },
        rHand: { x: 0.50, y: 0.20 - 0.10 * s, z: 0 },
        lKnee: { x: -0.16, y: -0.15 - 0.10 * s, z: 0 },
        rKnee: { x: 0.16, y: -0.15 + 0.10 * s, z: 0 },
        lFoot: { x: -0.18, y: -0.55 - 0.12 * s, z: 0 },
        rFoot: { x: 0.18, y: -0.55 + 0.12 * s, z: 0 }
      };
    }
  },
  {
    name: "قفزة + هبوط",
    frames: 120,
    joints(t) {
      const jump = Math.max(0, Math.sin(t));
      const swing = Math.sin(t * 1.2);
      return {
        head: { x: 0.0, y: 0.72 + 0.10 * jump, z: 0 },
        neck: { x: 0.0, y: 0.55 + 0.09 * jump, z: 0 },
        pelvis: { x: 0.0, y: 0.10 + 0.18 * jump, z: 0 },
        lShoulder: { x: -0.22, y: 0.48 + 0.10 * jump, z: 0 },
        rShoulder: { x: 0.22, y: 0.48 + 0.10 * jump, z: 0 },
        lElbow: { x: -0.36, y: 0.34 + 0.10 * jump + 0.08 * swing, z: 0 },
        rElbow: { x: 0.36, y: 0.34 + 0.10 * jump - 0.08 * swing, z: 0 },
        lHand: { x: -0.46, y: 0.22 + 0.18 * jump + 0.10 * swing, z: 0 },
        rHand: { x: 0.46, y: 0.22 + 0.18 * jump - 0.10 * swing, z: 0 },
        lKnee: { x: -0.16, y: -0.18 + 0.12 * jump, z: 0 },
        rKnee: { x: 0.16, y: -0.18 + 0.12 * jump, z: 0 },
        lFoot: { x: -0.18, y: -0.55 + 0.18 * jump, z: 0 },
        rFoot: { x: 0.18, y: -0.55 + 0.18 * jump, z: 0 }
      };
    }
  }
];
