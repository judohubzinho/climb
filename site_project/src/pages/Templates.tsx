import { useState } from "react";
import { Link, useNavigate } from "react-router";
import templatesSvg from "../../imports/10_-_TELA_TEMPLATES__1_.svg";
import NavDropdown from "../components/NavDropdown";
import AuthNavSlot from "../components/AuthNavSlot";

/* SVG canvas: 1900 × 3944 */
const W = 1900;
const H = 3944;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const BD = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";
const CARD_X = [365, 740, 1200];
const CARD_W = [315, 425, 445];

export default function Templates() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const searchInput: React.CSSProperties = {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    background: "transparent", border: "none", outline: "none",
    fontFamily: BD, color: "#3a2f22", letterSpacing: "0.5px",
    fontSize: "1vw", padding: "0 4vw 0 3.2vw", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      <img src={templatesSvg} alt="Templates — CLIMB"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }} draggable={false} />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* ── Navbar ── */}
        <Link to="/" style={{ position: "absolute", left: x(59), top: y(130), width: w(124), height: h(50), pointerEvents: "auto", display: "block" }} aria-label="CLIMB — início" />
        <Link to="/#sobre" style={{ position: "absolute", left: x(312), top: y(134), width: w(60), height: h(40), pointerEvents: "auto", display: "block" }} aria-label="Sobre" />
        <Link to="/vagas" style={{ position: "absolute", left: x(433), top: y(134), width: w(75), height: h(45), pointerEvents: "auto", display: "block" }} aria-label="Vagas" />
        <Link to="/cursos" style={{ position: "absolute", left: x(551), top: y(135), width: w(65), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Cursos" />
        <NavDropdown ariaLabel="Mais opções de Cursos" items={[{ label: "Consultoria", to: "/cursos/consultoria" }, { label: "Trilhas e Testes", to: "/cursos/trilhas-e-testes" }, { label: "Workshop", to: "/cursos/workshop" }]}
          triggerStyle={{ position: "absolute", left: x(616), top: y(135), width: w(25), height: h(35) }}
          panelLeft={x(551)} panelTop={y(195)} />
        <Link to="/templates" style={{ position: "absolute", left: x(724), top: y(135), width: w(90), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Templates" />
        <Link to="/descubra-pessoas" style={{ position: "absolute", left: x(892), top: y(135), width: w(165), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Descubra pessoas" />
        <NavDropdown ariaLabel="Networking" items={[{ label: "Eventos", to: "/networking/eventos" }, { label: "Grupos", to: "/networking/grupos" }]}
          triggerStyle={{ position: "absolute", left: x(1100), top: y(135), width: w(190), height: h(35) }}
          panelLeft={x(1112)} panelTop={y(195)} />
        <AuthNavSlot x={x} y={y} w={w} h={h} />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1765), top: y(1595), width: w(80), height: h(80), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: "50%" }} />

        {/* ── Busca ── */}
        <div style={{ position: "absolute", left: x(390), top: y(695), width: w(1145), height: h(90), pointerEvents: "auto" }}>
          <input type="text" value={busca} onChange={e => setBusca(e.target.value)} style={searchInput} aria-label="Encontre modelos de currículo ou portfólio" />
        </div>

        {/* ── "Ver template" — Currículos (levam pro Cadastro) ── */}
        {CARD_X.map((cx, i) => (
          <button key={`cv-${i}`} type="button" onClick={() => navigate("/cadastro")} aria-label="Ver template de currículo"
            style={{ position: "absolute", left: x(cx), top: y(1865), width: w(CARD_W[i]), height: h(75), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }} />
        ))}

        {/* ── "Ver template" — Portfólios (levam pro Cadastro) ── */}
        {CARD_X.map((cx, i) => (
          <button key={`pf-${i}`} type="button" onClick={() => navigate("/cadastro")} aria-label="Ver template de portfólio"
            style={{ position: "absolute", left: x(cx), top: y(2955), width: w(CARD_W[i]), height: h(70), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }} />
        ))}

        {/* ── Footer logo → home ── */}
        <Link to="/" style={{ position: "absolute", left: x(405), top: y(3282), width: w(140), height: h(50), pointerEvents: "auto", display: "block" }} aria-label="CLIMB footer" />
      </div>
    </div>
  );
}
