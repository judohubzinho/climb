import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import vagasLogadoSvg from "../../imports/06_-_TELA_VAGAS_-_COM_CASTARO__1_.svg";
import NavDropdown from "../components/NavDropdown";
import AuthNavSlot from "../components/AuthNavSlot";
import { useAuth } from "../auth";

/*
  Variante "logada" da tela de Vagas (o Figma exportou como uma tela
  separada: navbar com avatar/"Olá, Julia" em vez de Login/Cadastro,
  sem a barra de filtros e sem o CTA de conversão do final — faz
  sentido pra quem já é cadastrado.

  Alcançada, por ora, ao terminar de salvar o Perfil (fluxo:
  Cadastro → Perfil → Vagas recomendadas).

  SVG canvas: 1900 × 6940
*/
const W = 1900;
const H = 6940;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const BD = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";

// y = topo do botão "Quero me candidatar" de cada card de vaga
const CANDIDATAR_Y = [1737, 2341, 2946, 3649, 4333, 4967];

const PAGES = [
  { n: 1, x: 765 }, { n: 2, x: 825 }, { n: 3, x: 885 }, { n: 4, x: 945 },
];

export default function VagasLogado() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigate("/vagas", { replace: true });
  }, [user, navigate]);

  const searchInput: React.CSSProperties = {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    background: "transparent", border: "none", outline: "none",
    fontFamily: BD, color: "#3a2f22", letterSpacing: "0.5px",
    fontSize: "1vw", padding: "0 4vw 0 3.2vw", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      <img
        src={vagasLogadoSvg}
        alt="Vagas recomendadas — CLIMB"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        draggable={false}
      />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* ── Navbar ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(59), top: y(149), width: w(124), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB — início" />
        <Link to="/#sobre"
          style={{ position: "absolute", left: x(312), top: y(149), width: w(60), height: h(40),
            pointerEvents: "auto", display: "block" }}
          aria-label="Sobre" />

        <Link to="/vagas"
          style={{ position: "absolute", left: x(432), top: y(149), width: w(75), height: h(45),
            pointerEvents: "auto", display: "block" }}
          aria-label="Vagas" />

        {/* ── Navbar: "Cursos" (texto → /cursos) e ▾ (dropdown) / "Networking" ▾ ── */}
        <Link to="/cursos"
          style={{ position: "absolute", left: x(551), top: y(150), width: w(65), height: h(35),
            pointerEvents: "auto", display: "block" }}
          aria-label="Cursos" />
        <NavDropdown ariaLabel="Mais opções de Cursos" items={[{ label: "Consultoria", to: "/cursos/consultoria" }, { label: "Trilhas e Testes", to: "/cursos/trilhas-e-testes" }, { label: "Workshop", to: "/cursos/workshop" }]}
          triggerStyle={{ position: "absolute", left: x(616), top: y(150), width: w(25), height: h(35) }}
          panelLeft={x(551)} panelTop={y(210)} />
        <Link to="/templates" style={{ position: "absolute", left: x(724), top: y(150), width: w(90), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Templates" />
        <Link to="/descubra-pessoas" style={{ position: "absolute", left: x(892), top: y(150), width: w(165), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Descubra pessoas" />
        <NavDropdown ariaLabel="Networking" items={[{ label: "Eventos", to: "/networking/eventos" }, { label: "Grupos", to: "/networking/grupos" }, { label: "Empresas", to: "/networking/empresas" }]}
          triggerStyle={{ position: "absolute", left: x(1100), top: y(150), width: w(190), height: h(35) }}
          panelLeft={x(1112)} panelTop={y(210)} />
        <Link to="/parceiros" style={{ position: "absolute", left: x(1318), top: y(150), width: w(82), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Parceiros" />
        <Link to="/planos" style={{ position: "absolute", left: x(1475), top: y(150), width: w(58), height: h(35), pointerEvents: "auto", display: "block" }} aria-label="Planos" />

        {/* Olá, [nome] + avatar (cobre a versão fixa "Julia" desenhada na imagem) */}
        <AuthNavSlot x={x} y={y} w={w} h={h} coverBox={{ left: 1590, top: 100, width: 310, height: 120 }} />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1745), top: y(1660), width: w(80), height: h(80),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: "50%" }} />

        {/* ── Busca ── */}
        <div style={{ position: "absolute", left: x(215), top: y(1065), width: w(725), height: h(90),
          pointerEvents: "auto" }}>
          <input type="text" placeholder="" style={searchInput} aria-label="Cargo ou palavra-chave" />
        </div>
        <div style={{ position: "absolute", left: x(965), top: y(1065), width: w(700), height: h(90),
          pointerEvents: "auto" }}>
          <input type="text" placeholder="" style={searchInput} aria-label="Região, bairro ou zona" />
        </div>

        {/* ── Botões "Quero me candidatar" ── */}
        {CANDIDATAR_Y.map((cy, i) => (
          <button key={i} type="button" onClick={() => navigate("/perfil")}
            aria-label="Quero me candidatar"
            style={{ position: "absolute", left: x(410), top: y(cy), width: w(460), height: h(90),
              pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
              borderRadius: 999 }} />
        ))}

        {/* ── Paginação (visual) ── */}
        {PAGES.map(p => (
          <button key={p.n} type="button" aria-label={`Página ${p.n}`}
            style={{ position: "absolute", left: x(p.x), top: y(5175), width: w(45), height: h(55),
              pointerEvents: "auto", background: "transparent", border: "none",
              borderRadius: "0.4vw", cursor: "pointer" }} />
        ))}
        <button type="button" aria-label="Próxima página"
          style={{ position: "absolute", left: x(1040), top: y(5185), width: w(160), height: h(50),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }} />

        {/* ── Footer logo → home ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(404), top: y(6289), width: w(140), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB footer" />

      </div>
    </div>
  );
}
