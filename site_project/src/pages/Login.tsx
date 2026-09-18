import { useState } from "react";
import { Link, useNavigate } from "react-router";
import loginSvg from "../../imports/LOGIN_CLIENTE.svg";
import NavDropdown from "../components/NavDropdown";

/*
  Strategy: display the original Figma SVG as a full-width image, then
  overlay interactive elements (inputs, button, nav links, Libras) using
  absolute percentage-based positioning derived from SVG coordinates.

  SVG canvas: 1900 × 2741
*/
const W = 1900;
const H = 2741;

// Helpers — convert SVG px to percentage strings
const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const BLUE   = "#555CF0";
const BLUE2  = "#575FF2";
const CREAM  = "#fff0da";
const LAV    = "#A2A6F2";
const BD     = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";
const BK     = "'Franklin Gothic Book:Regular','Barlow',Arial,sans-serif";
const BM     = "'Franklin Gothic Medium:Regular','Barlow',Arial,sans-serif";

export default function Login() {
  const navigate = useNavigate();
  const [email,  setEmail]  = useState("");
  const [senha,  setSenha]  = useState("");
  const [show,   setShow]   = useState(false);
  const [focused, setFocus] = useState<"email"|"senha"|null>(null);

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

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      {/* ── Full-page SVG image — exact Figma design ── */}
      <img
        src={loginSvg}
        alt="Login CLIMB"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        draggable={false}
      />

      {/* ══════════════════════════════════════════
          Interactive overlay — all positioned via
          percentage coordinates from the SVG canvas
      ══════════════════════════════════════════ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* ── Navbar: logo link ── */}
        <Link to="/"
          style={{ position:"absolute", left:x(59), top:y(130), width:w(124), height:h(50),
            pointerEvents:"auto", display:"block" }}
          aria-label="CLIMB — início" />

        {/* ── Navbar: "Vagas" ── */}
        <Link to="/#sobre"
          style={{ position: "absolute", left: x(312), top: y(134), width: w(60), height: h(40),
            pointerEvents: "auto", display: "block" }}
          aria-label="Sobre" />

        <Link to="/vagas"
          style={{ position:"absolute", left:x(433), top:y(134), width:w(75), height:h(45),
            pointerEvents:"auto", display:"block" }}
          aria-label="Vagas" />

        {/* ── Navbar: "Cursos" (texto → /cursos) e ▾ (dropdown) / "Networking" ▾ ── */}
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

        {/* ── Navbar: "Cadastro" pill (ou "Olá, nome" quando logado) ── */}
        {/* ── Navbar: "Cadastro" pill ── */}
        <Link to="/cadastro"
          style={{ position:"absolute", left:x(1737), top:y(134), width:w(106), height:h(42),
            pointerEvents:"auto", display:"block", borderRadius:999 }}
          aria-label="Cadastro" />

        {/* ── Acesso rápido: Google ── */}
        <button aria-label="Entrar com Google"
          style={{ position:"absolute", left:x(809), top:y(1073), width:w(48), height:h(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            borderRadius:"50%" }} />

        {/* ── Acesso rápido: Facebook ── */}
        <button aria-label="Entrar com Facebook"
          style={{ position:"absolute", left:x(887), top:y(1073), width:w(48), height:h(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            borderRadius:"50%" }} />

        {/* ── Acesso rápido: X ── */}
        <button aria-label="Entrar com X"
          style={{ position:"absolute", left:x(967), top:y(1073), width:w(48), height:h(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            borderRadius:"50%" }} />

        {/* ── Acesso rápido: Apple ── */}
        <button aria-label="Entrar com Apple"
          style={{ position:"absolute", left:x(1051), top:y(1073), width:w(48), height:h(56),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            borderRadius:"50%" }} />

        {/* ── E-MAIL input (SVG: x=480, y=1352, w=940, h=73) ── */}
        <div style={{ position:"absolute", left:x(480), top:y(1352), width:w(940), height:h(73),
          pointerEvents:"auto",
          border: `2px solid ${focused === "email" ? LAV : "transparent"}`,
          borderRadius: "1vw",
          boxSizing: "border-box",
          transition: "border-color .2s" }}>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus(null)}
            style={{ ...inputBase, inset: 0, width: "100%", height: "100%" }}
          />
        </div>

        {/* ── SENHA input (SVG: x=484, y=1525, w=940, h=73) ── */}
        <div style={{ position:"absolute", left:x(484), top:y(1525), width:w(940), height:h(73),
          pointerEvents:"auto",
          border: `2px solid ${focused === "senha" ? LAV : "transparent"}`,
          borderRadius: "1vw",
          boxSizing: "border-box",
          transition: "border-color .2s" }}>
          <input
            type={show ? "text" : "password"}
            placeholder=""
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onFocus={() => setFocus("senha")}
            onBlur={() => setFocus(null)}
            style={{ ...inputBase, inset: 0, width: "100%", height: "100%",
              paddingRight: "5vw" }}
          />
        </div>

        {/* ── Eye icon toggle (SVG: x=1351, y=1544, w=35, h=35) ── */}
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={{ position:"absolute", left:x(1351), top:y(1544), width:w(40), height:h(40),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:`${CREAM}77` }}>
          {show ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round"
              style={{ width:"1.5vw", height:"1.5vw", minWidth:12, minHeight:12 }}>
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round"
              style={{ width:"1.5vw", height:"1.5vw", minWidth:12, minHeight:12 }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>

        {/* ── ENTRAR button (SVG: x=472, y=1643, w=940, h=73) ── */}
        <button
          onClick={() => { if (email && senha) navigate("/perfil") }}
          style={{ position:"absolute", left:x(472), top:y(1643), width:w(940), height:h(73),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            borderRadius:999 }}
          aria-label="Entrar" />

        {/* ── "Esqueceu a senha?" link area (SVG: x=1160, y=1477, w~200, h=20) ── */}
        <a href="#"
          style={{ position:"absolute", left:x(1160), top:y(1477), width:w(220), height:h(30),
            pointerEvents:"auto", display:"block" }}
          aria-label="Esqueceu a senha?" />

        {/* ── "Não tem conta?" / criar link (SVG: y≈1760-1800) ── */}
        <Link to="/cadastro"
          style={{ position:"absolute", left:x(700), top:y(1758), width:w(500), height:h(48),
            pointerEvents:"auto", display:"block" }}
          aria-label="Criar conta" />

        {/* ── Libras button (SVG: x=1781.5, y=854, w=60, h=60) ── */}
        <button
          aria-label="Acessibilidade em Libras"
          style={{ position:"absolute", left:x(1781), top:y(854), width:w(62), height:h(62),
            pointerEvents:"auto", background:"transparent", border:"none", cursor:"pointer",
            borderRadius:10 }} />

        {/* ── Footer nav links (SVG: y≈2119-2422) — generic clickable zones ── */}
        <a href="#" style={{ position:"absolute", left:x(413), top:y(2092),
          width:w(123), height:h(41), pointerEvents:"auto", display:"block" }}
          aria-label="CLIMB footer logo" />

      </div>
    </div>
  );
}
