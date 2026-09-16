import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import homeImg from "./imports/01_-_TELA_PRINCIPAL.jpg";
import NavDropdown from "./components/NavDropdown";

/*
  App.tsx — Home page
  Mesma estratégia de todas as outras páginas: a imagem exportada do
  Figma como fundo pixel-perfect, com overlays transparentes clicáveis
  posicionados em % a partir das coordenadas reais da imagem.

  Imagem: 1900 × 6627
*/
const W = 1900;
const H = 6627;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const CARDS = [
  { to: "/vagas", label: "Vagas", x: 238 },
  { to: "/cursos", label: "Cursos", x: 598 },
  { to: "/parceiros", label: "Parceiros", x: 960 },
  { to: "/planos", label: "Planos", x: 1325 },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      <img
        src={homeImg}
        alt="CLIMB — A sua carreira merece altitude"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        draggable={false}
      />

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
          triggerStyle={{ position: "absolute", left: x(1112), top: y(135), width: w(115), height: h(35) }}
          panelLeft={x(1112)} panelTop={y(195)} />
        <Link to="/parceiros" style={{ position: "absolute", left: x(1318), top: y(135), width: w(82), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Parceiros" />
        <Link to="/planos" style={{ position: "absolute", left: x(1475), top: y(135), width: w(58), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Planos" />
        <Link to="/login" style={{ position: "absolute", left: x(1665), top: y(134), width: w(74), height: h(45), pointerEvents: "auto", display: "block" }} aria-label="Login" />
        <Link to="/cadastro" style={{ position: "absolute", left: x(1737), top: y(134), width: w(106), height: h(42), pointerEvents: "auto", display: "block", borderRadius: 999 }} aria-label="Cadastro" />

        {/* ── Âncora: seção "Sobre a empresa" ── */}
        <div id="sobre" style={{ position: "absolute", top: y(1650), left: 0, width: 1, height: 1 }} />

        {/* ── Hero: Login / Cadastro ── */}
        <Link to="/login" style={{ position: "absolute", left: x(235), top: y(845), width: w(65), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Login" />
        <Link to="/cadastro" style={{ position: "absolute", left: x(330), top: y(825), width: w(210), height: h(70), pointerEvents: "auto", display: "block", borderRadius: 999 }} aria-label="Cadastro" />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1745), top: y(1595), width: w(80), height: h(80), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: "50%" }} />

        {/* ── 4 cards: Vagas / Cursos / Parceiros / Planos ── */}
        {CARDS.map(c => (
          <Link key={c.to} to={c.to} aria-label={c.label}
            style={{ position: "absolute", left: x(c.x), top: y(1078), width: w(340), height: h(487), pointerEvents: "auto", display: "block", borderRadius: "1vw" }} />
        ))}

        {/* ── Planos: "Assinar agora" / "Quero contratar com o CLIMB" ── */}
        <button type="button" onClick={() => navigate("/cadastro")} aria-label="Assinar agora"
          style={{ position: "absolute", left: x(363), top: y(5010), width: w(512), height: h(80), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }} />
        <button type="button" onClick={() => navigate("/cadastro")} aria-label="Quero contratar com o CLIMB"
          style={{ position: "absolute", left: x(1088), top: y(5010), width: w(512), height: h(80), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }} />

        {/* ── CTA final: "Quero escalar!" ── */}
        <button type="button" onClick={() => navigate("/cadastro")} aria-label="Quero escalar!"
          style={{ position: "absolute", left: x(850), top: y(5630), width: w(310), height: h(80), pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", borderRadius: 999 }} />

        {/* ── Footer logo (já estamos na home, mas mantém o padrão) ── */}
        <Link to="/" style={{ position: "absolute", left: x(395), top: y(5965), width: w(140), height: h(50), pointerEvents: "auto", display: "block" }} aria-label="CLIMB footer" />
      </div>
    </div>
  );
}
