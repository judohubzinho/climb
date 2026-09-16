import { Link, useNavigate } from "react-router";
import consultoriaSvg from "../../imports/08_-_TELA_CURSOS_-_CONSULTORIA__1_.svg";
import NavDropdown from "../components/NavDropdown";

/*
  Página institucional (majoritariamente estática) — a maior parte do
  conteúdo é só texto/imagem do próprio Figma. Overlay cobre só navbar,
  Libras e os 2 CTAs finais.

  SVG canvas: 1900 × 7672
*/
const W = 1900;
const H = 7672;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

export default function Consultoria() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      <img
        src={consultoriaSvg}
        alt="Consultoria CLIMB"
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
          triggerStyle={{ position: "absolute", left: x(1112), top: y(135), width: w(115), height: h(35) }}
          panelLeft={x(1112)} panelTop={y(195)} />
        <Link to="/parceiros" style={{ position: "absolute", left: x(1318), top: y(135), width: w(82), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Parceiros" />
        <Link to="/planos" style={{ position: "absolute", left: x(1475), top: y(135), width: w(58), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Planos" />
        <Link to="/login"
          style={{ position: "absolute", left: x(1665), top: y(134), width: w(74), height: h(45),
            pointerEvents: "auto", display: "block" }}
          aria-label="Login" />
        <Link to="/cadastro"
          style={{ position: "absolute", left: x(1737), top: y(134), width: w(106), height: h(42),
            pointerEvents: "auto", display: "block", borderRadius: 999 }}
          aria-label="Cadastro" />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1745), top: y(1605), width: w(80), height: h(80),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: "50%" }} />

        {/* ── CTA final ── */}
        <button type="button" onClick={() => navigate("/cadastro")}
          aria-label="Sou estudante ou recém-formado — quero minha consultoria personalizada"
          style={{ position: "absolute", left: x(395), top: y(6615), width: w(520), height: h(80),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />
        <button type="button" onClick={() => navigate("/cadastro")}
          aria-label="Sou empresa ou agência — quero falar com o time do CLIMB"
          style={{ position: "absolute", left: x(1010), top: y(6615), width: w(405), height: h(80),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />

        {/* ── Footer logo → home ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(395), top: y(7010), width: w(140), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB footer" />

      </div>
    </div>
  );
}
