import { motion } from "framer-motion";

export default function Motion3D() {
  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>تحليل الحركة ثلاثي الأبعاد</h1>

      <div
        style={{
          background: "rgba(20,30,50,0.7)",
          padding: 30,
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            width: 200,
            height: 200,
            margin: "auto",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #00e0a4, #002b45)",
            boxShadow: "0 0 60px rgba(0,224,164,0.4)"
          }}
        />

        <p style={{ marginTop: 25, textAlign: "center" }}>
          محاكاة نموذج حركي يعتمد على تحليل المفاصل والعضلات
          وتوقع مناطق الإجهاد قبل الإصابة.
        </p>
      </div>
    </div>
  );
}
