import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SODIS Electronics — Distributeur officiel LG en Côte d'Ivoire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [logo, tv] = await Promise.all([readFile(join(process.cwd(), "public/brand/sodis-logo.png")), readFile(join(process.cwd(), "src/assets/og-tv.png"))]);
  const src = (b: Buffer) => `data:image/png;base64,${b.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "55%" }}>
          <img src={src(logo)} width={300} height={98} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 4, color: "#d71920", fontWeight: 700 }}>DISTRIBUTEUR OFFICIEL LG</div>
            <div style={{ fontSize: 60, fontWeight: 700, color: "#0b0b0d", lineHeight: 1.05, marginTop: 16 }}>Le meilleur de la tech, livré et installé chez vous.</div>
          </div>
          <div style={{ fontSize: 24, color: "#6e6e73" }}>TV · Audio · Clim · Froid · Lavage · Cuisine — Côte d&apos;Ivoire</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "45%" }}>
          <img src={src(tv)} width={480} height={367} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
