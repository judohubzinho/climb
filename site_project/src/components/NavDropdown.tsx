import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

const CREAM = "#fff0da";
const BK = "'Franklin Gothic Book:Regular','Barlow',Arial,sans-serif";

type DropdownItem = string | { label: string; to: string };

type NavDropdownProps = {
  ariaLabel: string;
  items: DropdownItem[];
  /** Estilo absoluto (left/top/width/height) do gatilho — cobre o texto "Cursos ˅" / "Networking ˅" que já existe na imagem de fundo. */
  triggerStyle: React.CSSProperties;
  /** Posição absoluta (left/top) do painel do dropdown, em relação ao mesmo container. */
  panelLeft: string;
  panelTop: string;
};

/*
  Dropdown de navbar reutilizável entre todas as páginas.
  O rótulo do item ("Cursos", "Networking") já está desenhado na imagem
  de fundo do Figma — este componente só adiciona o clique + o painel
  com as opções, no mesmo estilo visual do mockup enviado.
*/
export default function NavDropdown({ ariaLabel, items, triggerStyle, panelLeft, panelTop }: NavDropdownProps) {
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

  return (
    <div ref={ref}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{ ...triggerStyle, pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }}
      />
      {open && (
        <div
          role="menu"
          aria-label={`Opções de ${ariaLabel}`}
          style={{
            position: "absolute", left: panelLeft, top: panelTop,
            pointerEvents: "auto", background: "#0c0c0cf2",
            border: "1px solid #ffffff22", borderRadius: "0.6vw",
            padding: "0.5vw 0", minWidth: "9vw", zIndex: 50,
            boxShadow: "0 12px 32px rgba(0,0,0,.5)",
          }}
        >
          {items.map(it => {
            const label = typeof it === "string" ? it : it.label;
            const itemStyle: React.CSSProperties = {
              display: "block", padding: "0.55vw 1.2vw", fontFamily: BK, color: CREAM,
              fontSize: "0.85vw", whiteSpace: "nowrap", textDecoration: "none",
            };
            return typeof it === "string" ? (
              <div key={label} role="menuitem" style={{ ...itemStyle, cursor: "default" }}>
                {label}
              </div>
            ) : (
              <Link key={label} to={it.to} role="menuitem" onClick={() => setOpen(false)}
                style={{ ...itemStyle, cursor: "pointer" }}>
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
