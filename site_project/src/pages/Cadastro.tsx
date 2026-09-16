import { useState } from "react";
import { Link, useNavigate } from "react-router";
import cadastroSvg from "../../imports/02_-_TELA_CADASTRO.svg";
import NavDropdown from "../components/NavDropdown";

/*
  SVG canvas: 1900 × 3189
  Same overlay strategy as Login page.
*/
const W = 1900;
const H = 3189;

const px = (v: number, dim: number) => `${((v / dim) * 100).toFixed(4)}%`;
const lx = (v: number) => px(v, W);
const ly = (v: number) => px(v, H);
const lw = (v: number) => px(v, W);
const lh = (v: number) => px(v, H);

const BLUE  = "#555CF0";
const CREAM = "#fff0da";
const LAV   = "#A2A6F2";
const BD    = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";
const BK    = "'Franklin Gothic Book:Regular','Barlow',Arial,sans-serif";

export default function Cadastro() {
  const navigate = useNavigate();

  // Tipo de conta (3 cards): estudante | formado | empresa
  const [tipo,    setTipo]    = useState<number | null>(null);
  const [nome,    setNome]    = useState("");
  const [email,   setEmail]   = useState("");
  const [tel,     setTel]     = useState("");
  const [senha,   setSenha]   = useState("");
  const [focused, setFocus]   = useState<string | null>(null);

  const inputBase: React.CSSProperties = {
    position: "absolute",
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: BD,
    color: `${CREAM}99`,
    letterSpacing: "1.5px",
    fontSize: "1.1vw",
    padding: "0 3vw",
    boxSizing: "border-box",
  };

  // Input wrapper with focus glow
  function InputOverlay({
    id, xSvg, ySvg, wSvg, hSvg, type = "text", value, onChange
  }: {
    id: string; xSvg: number; ySvg: number; wSvg: number; hSvg: number;
    type?: string; value: string; onChange: (v: string) => void;
  }) {
    return (
      <div style={{
        position: "absolute",
        left: lx(xSvg), top: ly(ySvg), width: lw(wSvg), height: lh(hSvg),
        pointerEvents: "auto",
        border: `2px solid ${focused === id ? LAV : "transparent"}`,
        borderRadius: "1vw",
        boxSizing: "border-box",
        transition: "border-color .2s",
      }}>
        <input
          type={type}
          placeholder=""
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocus(id)}
          onBlur={() => setFocus(null)}
          style={{ ...inputBase, inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      {/* ── Full-page SVG image — Figma design ── */}
      <img
        src={cadastroSvg}
        alt="Cadastro CLIMB"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        draggable={false}
      />

      {/* ── Interactive overlay ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* Navbar: logo link → home */}
        <Link to="/"
          style={{ position:"absolute", left:lx(59), top:ly(130), width:lw(124), height:lh(50),
            pointerEvents:"auto", display:"block" }}
          aria-label="CLIMB — início" />

        {/* Navbar: "Vagas" */}
        <Link to="/vagas"
          style={{ position:"absolute", left:lx(433), top:ly(134), width:lw(75), height:lh(45),
            pointerEvents:"auto", display:"block" }}
          aria-label="Vagas" />

        {/* Navbar: "Cursos" (texto → /cursos) e ▾ (dropdown) / "Networking" ▾ */}
        <Link to="/cursos"
          style={{ position: "absolute", left: lx(551), top: ly(135), width: lw(65), height: lh(35),
            pointerEvents: "auto", display: "block" }}
          aria-label="Cursos" />
        <NavDropdown ariaLabel="Mais opções de Cursos" items={[{ label: "Consultoria", to: "/cursos/consultoria" }, { label: "Trilhas e Testes", to: "/cursos/trilhas-e-testes" }, { label: "Workshop", to: "/cursos/workshop" }]}
          triggerStyle={{ position: "absolute", left: lx(616), top: ly(135), width: lw(25), height: lh(35) }}
          panelLeft={lx(551)} panelTop={ly(195)} />
        <Link to="/templates" style={{ position: "absolute", left: lx(724), top: ly(135), width: lw(90), height: lh(35), pointerEvents: "auto", display: "block" }} aria-label="Templates" />
        <Link to="/networking/eventos" style={{ position: "absolute", left: lx(1112), top: ly(135), width: lw(75), height: lh(35), pointerEvents: "auto", display: "block" }} aria-label="Networking" />
        <NavDropdown ariaLabel="Mais opções de Networking" items={[{ label: "Eventos", to: "/networking/eventos" }, { label: "Grupos", to: "/networking/grupos" }, { label: "Empresas", to: "/networking/empresas" }]}
          triggerStyle={{ position: "absolute", left: lx(1187), top: ly(135), width: lw(40), height: lh(35) }}
          panelLeft={lx(1112)} panelTop={ly(195)} />
        <Link to="/parceiros" style={{ position: "absolute", left: lx(1318), top: ly(135), width: lw(82), height: lh(35), pointerEvents: "auto", display: "block" }} aria-label="Parceiros" />
        <Link to="/planos" style={{ position: "absolute", left: lx(1475), top: ly(135), width: lw(58), height: lh(35), pointerEvents: "auto", display: "block" }} aria-label="Planos" />

        {/* Navbar: "Login" pill */}
        <Link to="/login"
          style={{ position:"absolute", left:lx(1737), top:ly(134), width:lw(106), height:lh(42),
            pointerEvents:"auto", display:"block", borderRadius:999 }}
          aria-label="Login" />

        {/* ── 3 tipo-de-conta cards ──
            Card 1: x=237, y=983, w=463, h=187 (Estudante)
            Card 2: x=718, y=984, w=463, h=187 (Formado)
            Card 3: x=1197, y=985, w=463, h=187 (Empresa) */}
        {[
          { idx: 0, xSvg: 237,  ySvg: 983, label: "Sou estudante" },
          { idx: 1, xSvg: 718,  ySvg: 984, label: "Sou formado"   },
          { idx: 2, xSvg: 1197, ySvg: 985, label: "Sou empresa"   },
        ].map(({ idx, xSvg, ySvg, label }) => (
          <button
            key={idx}
            aria-label={label}
            onClick={() => setTipo(tipo === idx ? null : idx)}
            style={{
              position: "absolute",
              left: lx(xSvg), top: ly(ySvg), width: lw(463), height: lh(187),
              pointerEvents: "auto",
              background: "transparent",
              border: tipo === idx ? `3px solid ${LAV}` : "none",
              borderRadius: "1.2vw",
              cursor: "pointer",
              boxShadow: tipo === idx ? `0 0 24px ${LAV}44` : "none",
              transition: "border .18s, box-shadow .18s",
            }}
          />
        ))}

        {/* ── Acesso rápido social buttons ──
            (Positioned over the social icon area in SVG, y≈1350–1450) */}
        {/* Google */}
        <button aria-label="Cadastrar com Google"
          style={{ position:"absolute", left:lx(809), top:ly(1460), width:lw(48), height:lh(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer", borderRadius:"50%" }} />
        {/* Facebook */}
        <button aria-label="Cadastrar com Facebook"
          style={{ position:"absolute", left:lx(887), top:ly(1460), width:lw(48), height:lh(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer", borderRadius:"50%" }} />
        {/* X */}
        <button aria-label="Cadastrar com X"
          style={{ position:"absolute", left:lx(967), top:ly(1460), width:lw(48), height:lh(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer", borderRadius:"50%" }} />
        {/* Apple */}
        <button aria-label="Cadastrar com Apple"
          style={{ position:"absolute", left:lx(1051), top:ly(1460), width:lw(48), height:lh(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer", borderRadius:"50%" }} />

        {/* ── 4 campos de formulário ──
            Input 1 (NOME):    x=480, y=1640, w=942, h=73
            Input 2 (E-MAIL):  x=480, y=1748, w=942, h=73
            Input 3 (TELEFONE):x=480, y=1856, w=942, h=73
            Input 4 (SENHA):   x=480, y=1964, w=942, h=73 */}
        <InputOverlay id="nome"  xSvg={480} ySvg={1640} wSvg={942} hSvg={73}
          value={nome}  onChange={setNome} />
        <InputOverlay id="email" xSvg={480} ySvg={1748} wSvg={942} hSvg={73}
          type="email" value={email} onChange={setEmail} />
        <InputOverlay id="tel"   xSvg={480} ySvg={1856} wSvg={942} hSvg={73}
          type="tel"   value={tel}   onChange={setTel} />
        <InputOverlay id="senha" xSvg={480} ySvg={1964} wSvg={942} hSvg={73}
          type="password" value={senha} onChange={setSenha} />

        {/* ── Botão CRIAR CONTA (x=473, y=2056, w=940, h=73) ── */}
        <button
          onClick={() => { if (nome && email && senha) navigate("/perfil") }}
          style={{
            position: "absolute",
            left: lx(473), top: ly(2056), width: lw(940), height: lh(73),
            pointerEvents: "auto",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: 999,
          }}
          aria-label="Criar conta"
        />

        {/* ── Link "Já tenho conta" / login (abaixo do botão) ── */}
        <Link to="/login"
          style={{ position:"absolute", left:lx(700), top:ly(2160), width:lw(500), height:lh(48),
            pointerEvents:"auto", display:"block" }}
          aria-label="Já tenho conta" />

        {/* ── Libras button (x=1781.5, y=854, w=60, h=60) ── */}
        <button
          aria-label="Acessibilidade em Libras"
          style={{
            position: "absolute",
            left: lx(1781), top: ly(854), width: lw(62), height: lh(62),
            pointerEvents: "auto",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: 10,
          }}
        />

        {/* ── Footer logo link (x=404, y=2540, w=123, h=41) ── */}
        <Link to="/"
          style={{ position:"absolute", left:lx(404), top:ly(2540), width:lw(123), height:lh(41),
            pointerEvents:"auto", display:"block" }}
          aria-label="CLIMB footer" />

      </div>
    </div>
  );
}
