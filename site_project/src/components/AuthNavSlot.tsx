import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth";

const CREAM = "#fff0da";
const BLUE = "#555CF0";
const BD = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";
const BK = "'Franklin Gothic Book:Regular','Barlow',Arial,sans-serif";

type Coord = (v: number) => string;

type AuthNavSlotProps = {
  x: Coord; y: Coord; w: Coord; h: Coord;
  /** Área (em px do SVG) a cobrir quando logado — por padrão, a mesma faixa do Login/Cadastro. */
  coverBox?: { left: number; top: number; width: number; height: number };
};

/*
  Substitui o par "Login" / "Cadastro" da navbar (desenhados na própria
  imagem de fundo) por "Olá, [nome]" + avatar quando a pessoa está logada.
  Cobre a área original com um retângulo na cor de fundo do site (a faixa
  da navbar é praticamente preta sólida em todas as telas) e desenha o
  novo conteúdo por cima.

  x/y/w/h: as mesmas funções de posicionamento em % já usadas na página
  (ou lx/ly/lw/lh, no caso do Cadastro.tsx).
*/
export default function AuthNavSlot({ x, y, w, h, coverBox }: AuthNavSlotProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!user) {
    return (
      <>
        <Link to="/login"
          style={{ position: "absolute", left: x(1665), top: y(134), width: w(74), height: h(45),
            pointerEvents: "auto", display: "block" }}
          aria-label="Login" />
        <Link to="/cadastro"
          style={{ position: "absolute", left: x(1737), top: y(134), width: w(106), height: h(42),
            pointerEvents: "auto", display: "block", borderRadius: 999 }}
          aria-label="Cadastro" />
      </>
    );
  }

  const initial = user.name.trim().charAt(0).toUpperCase() || "?";
  const box = coverBox ?? { left: 1640, top: 105, width: 260, height: 78 };

  return (
    <div ref={ref} style={{ position: "absolute", left: x(box.left), top: y(box.top), width: w(box.width), height: h(box.height), pointerEvents: "auto" }}>
      {/* cobre o "Login / Cadastro" desenhado na imagem de fundo */}
      <div style={{ position: "absolute", inset: 0, background: "#080808" }} />

      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label={`Olá, ${user.name}`}
        style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end",
          gap: "0.6vw", background: "transparent", border: "none", cursor: "pointer", padding: "0 0.4vw",
        }}>
        <span style={{ fontFamily: BD, color: CREAM, fontSize: "0.95vw", whiteSpace: "nowrap" }}>
          Olá, {user.name}
        </span>
        <span style={{
          width: "2.3vw", height: "2.3vw", minWidth: 30, minHeight: 30, borderRadius: "50%",
          background: BLUE, color: CREAM, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: BD, fontSize: "0.95vw", border: `2px solid ${CREAM}66`, flexShrink: 0,
        }}>
          {initial}
        </span>
      </button>

      {open && (
        <div role="menu" aria-label={`Menu de ${user.name}`} style={{
          position: "absolute", right: 0, top: "115%", background: "#0c0c0cf2",
          border: "1px solid #ffffff22", borderRadius: "0.6vw", padding: "0.5vw 0",
          minWidth: "9vw", zIndex: 50, boxShadow: "0 12px 32px rgba(0,0,0,.5)",
        }}>
          <Link to="/perfil" role="menuitem" onClick={() => setOpen(false)}
            style={{ display: "block", padding: "0.55vw 1.2vw", fontFamily: BK, color: CREAM,
              fontSize: "0.85vw", textDecoration: "none", whiteSpace: "nowrap" }}>
            Ver perfil
          </Link>
          <button type="button" role="menuitem"
            onClick={() => { setOpen(false); logout(); navigate("/"); }}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "0.55vw 1.2vw",
              fontFamily: BK, color: CREAM, fontSize: "0.85vw", background: "transparent",
              border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
