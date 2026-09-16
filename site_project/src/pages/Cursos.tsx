import { useState } from "react";
import { Link, useNavigate } from "react-router";
import cursosSvg from "../../imports/07_-_TELA_CURSOS__1_.svg";
import NavDropdown from "../components/NavDropdown";
import AuthNavSlot from "../components/AuthNavSlot";

/*
  Mesma estratégia das outras páginas: SVG do Figma como fundo +
  overlays interativos posicionados em % a partir das coordenadas
  reais do SVG (extraídas via OCR / recorte).

  SVG canvas: 1900 × 5394
*/
const W = 1900;
const H = 5394;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const BD = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";

// x dos botões de CTA dos 3 cards por linha (mesma grade nas 2 linhas)
const CARD_COLS = [365, 730, 1195];
const ROW_Y = [1845, 2845]; // linha Coursera, linha Domestika

export default function Cursos() {
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
      <img
        src={cursosSvg}
        alt="Cursos — CLIMB"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        draggable={false}
      />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* ── Navbar ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(59), top: y(130), width: w(124), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB — início" />
        <Link to="/#sobre"
          style={{ position: "absolute", left: x(312), top: y(134), width: w(60), height: h(40),
            pointerEvents: "auto", display: "block" }}
          aria-label="Sobre" />

        <Link to="/vagas"
          style={{ position: "absolute", left: x(433), top: y(134), width: w(75), height: h(45),
            pointerEvents: "auto", display: "block" }}
          aria-label="Vagas" />

        {/* "Cursos" (texto) → esta própria página / ▾ → dropdown */}
        <Link to="/cursos"
          style={{ position: "absolute", left: x(551), top: y(135), width: w(65), height: h(35),
            pointerEvents: "auto", display: "block" }}
          aria-label="Cursos" />
        <NavDropdown ariaLabel="Mais opções de Cursos" items={[{ label: "Consultoria", to: "/cursos/consultoria" }, { label: "Trilhas e Testes", to: "/cursos/trilhas-e-testes" }, { label: "Workshop", to: "/cursos/workshop" }]}
          triggerStyle={{ position: "absolute", left: x(616), top: y(135), width: w(25), height: h(35) }}
          panelLeft={x(551)} panelTop={y(195)} />

        <Link to="/templates" style={{ position: "absolute", left: x(724), top: y(135), width: w(90), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Templates" />
        <Link to="/descubra-pessoas" style={{ position: "absolute", left: x(892), top: y(135), width: w(165), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Descubra pessoas" />
        <NavDropdown ariaLabel="Networking" items={[{ label: "Eventos", to: "/networking/eventos" }, { label: "Grupos", to: "/networking/grupos" }, { label: "Empresas", to: "/networking/empresas" }]}
          triggerStyle={{ position: "absolute", left: x(1100), top: y(135), width: w(190), height: h(35) }}
          panelLeft={x(1112)} panelTop={y(195)} />
        <Link to="/parceiros" style={{ position: "absolute", left: x(1318), top: y(135), width: w(82), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Parceiros" />
        <Link to="/planos" style={{ position: "absolute", left: x(1475), top: y(135), width: w(58), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Planos" />

        <AuthNavSlot x={x} y={y} w={w} h={h} />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1745), top: y(1615), width: w(80), height: h(80),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: "50%" }} />

        {/* ── Busca ── */}
        <div style={{ position: "absolute", left: x(395), top: y(705), width: w(1105), height: h(80),
          pointerEvents: "auto", border: `2px solid transparent`, borderRadius: "0.6vw", boxSizing: "border-box" }}>
          <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
            style={searchInput} aria-label="Buscar cursos" />
        </div>

        {/* ── Botões dos cards de curso (levam pro Cadastro — assistir exige conta) ── */}
        {ROW_Y.map(ry => CARD_COLS.map((cx, i) => (
          <button key={`${ry}-${i}`} type="button" onClick={() => navigate("/cadastro")}
            aria-label="Assistir curso"
            style={{ position: "absolute", left: x(cx), top: y(ry), width: w(295), height: h(70),
              pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
              borderRadius: 999 }} />
        )))}

        {/* ── Ver mais (visual — sem mais cursos carregados ainda) ── */}
        <button type="button" aria-label="Ver mais cursos"
          style={{ position: "absolute", left: x(890), top: y(2995), width: w(180), height: h(40),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }} />

        {/* ── Footer logo → home ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(405), top: y(4732), width: w(140), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB footer" />

      </div>
    </div>
  );
}
