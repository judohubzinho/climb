import { useState } from "react";
import { Link, useNavigate } from "react-router";
import pessoasSvg from "../../imports/13_-_DESCUBRA_PESSOAS__1_.svg";
import NavDropdown from "../components/NavDropdown";

/* SVG canvas: 1900 × 4676 */
const W = 1900;
const H = 4676;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const BD = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";
const LAV = "#A2A6F2";

const CARD_X = [265, 740, 1215];
const CARD_W = [410, 420, 425];

const FILTERS = [
  { id: "nivel", x: 500, w: 320, label: "Nível profissional" },
  { id: "area", x: 850, w: 315, label: "Área de atuação" },
  { id: "inclusao", x: 1200, w: 200, label: "Inclusão" },
];

export default function DescubraPessoas() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});

  const toggleFilter = (id: string) => setOpenFilters(s => ({ ...s, [id]: !s[id] }));
  const limparFiltros = () => { setOpenFilters({}); setBusca(""); };

  const searchInput: React.CSSProperties = {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    background: "transparent", border: "none", outline: "none",
    fontFamily: BD, color: "#3a2f22", letterSpacing: "0.5px",
    fontSize: "1vw", padding: "0 4vw 0 3.2vw", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      <img src={pessoasSvg} alt="Descubra Pessoas — CLIMB"
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
        <NavDropdown ariaLabel="Networking" items={[{ label: "Eventos", to: "/networking/eventos" }, { label: "Grupos", to: "/networking/grupos" }, { label: "Empresas", to: "/networking/empresas" }]}
          triggerStyle={{ position: "absolute", left: x(1100), top: y(135), width: w(190), height: h(35) }}
          panelLeft={x(1112)} panelTop={y(195)} />
        <Link to="/parceiros" style={{ position: "absolute", left: x(1318), top: y(135), width: w(82), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Parceiros" />
        <Link to="/planos" style={{ position: "absolute", left: x(1475), top: y(135), width: w(58), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Planos" />
        <Link to="/login" style={{ position: "absolute", left: x(1665), top: y(134), width: w(74), height: h(45), pointerEvents: "auto", display: "block" }} aria-label="Login" />
        <Link to="/cadastro" style={{ position: "absolute", left: x(1737), top: y(134), width: w(106), height: h(42), pointerEvents: "auto", display: "block", borderRadius: 999 }} aria-label="Cadastro" />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1765), top: y(1595), width: w(80), height: h(80), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: "50%" }} />

        {/* ── Busca ── */}
        <div style={{ position: "absolute", left: x(400), top: y(835), width: w(1090), height: h(80), pointerEvents: "auto" }}>
          <input type="text" value={busca} onChange={e => setBusca(e.target.value)} style={searchInput} aria-label="Buscar pessoas" />
        </div>

        {/* ── Filtros (visual) ── */}
        {FILTERS.map(f => (
          <button key={f.id} type="button" aria-label={f.label} aria-pressed={!!openFilters[f.id]}
            onClick={() => toggleFilter(f.id)}
            style={{
              position: "absolute", left: x(f.x), top: y(975), width: w(f.w), height: h(75),
              pointerEvents: "auto", background: "transparent",
              border: openFilters[f.id] ? `2px solid ${LAV}` : "none",
              borderRadius: 999, cursor: "pointer", boxSizing: "border-box",
            }} />
        ))}
        <button type="button" onClick={limparFiltros} aria-label="Limpar filtros"
          style={{ position: "absolute", left: x(1400), top: y(975), width: w(200), height: h(75),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }} />

        {/* ── "Seguir" — 6 perfis (levam pro Cadastro) ── */}
        {[2175, 3180].map(ry => CARD_X.map((cx, i) => (
          <button key={`${ry}-${i}`} type="button" onClick={() => navigate("/cadastro")} aria-label="Seguir"
            style={{ position: "absolute", left: x(cx), top: y(ry), width: w(CARD_W[i]), height: h(70), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }} />
        )))}

        {/* ── Ver mais (visual) ── */}
        <button type="button" aria-label="Ver mais pessoas"
          style={{ position: "absolute", left: x(880), top: y(3330), width: w(160), height: h(40), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }} />

        {/* ── Footer logo → home ── */}
        <Link to="/" style={{ position: "absolute", left: x(395), top: y(4016), width: w(140), height: h(50), pointerEvents: "auto", display: "block" }} aria-label="CLIMB footer" />
      </div>
    </div>
  );
}
