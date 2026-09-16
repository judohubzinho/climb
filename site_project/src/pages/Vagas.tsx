import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import vagasSvg from "../../imports/05_-_TELA_VAGAS_-_SEM_CASTARO__1_.svg";
import NavDropdown from "../components/NavDropdown";
import AuthNavSlot from "../components/AuthNavSlot";
import { useAuth } from "../auth";

/*
  Mesma estratégia das outras páginas: SVG do Figma como imagem de fundo
  (design 100% fiel) + overlays interativos posicionados em % a partir
  das coordenadas reais do SVG (extraídas via OCR / detecção de contorno).

  SVG canvas: 1900 × 7037
*/
const W = 1900;
const H = 7037;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const LAV   = "#A2A6F2";
const CREAM = "#fff0da";
const BD    = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";

const FILTERS = [
  { id: "salario",    x: 300,  y: 1223, w: 180, h: 62, label: "Salário" },
  { id: "distancia",  x: 500,  y: 1223, w: 300, h: 62, label: "Distância (KM)" },
  { id: "modalidade", x: 820,  y: 1223, w: 240, h: 62, label: "Modalidade" },
  { id: "setor",      x: 1080, y: 1223, w: 160, h: 62, label: "Setor" },
  { id: "contrato",   x: 1260, y: 1223, w: 190, h: 62, label: "Contrato" },
  { id: "pcd",        x: 1470, y: 1223, w: 130, h: 62, label: "PCD" },
];

// y = topo do botão "Quero me candidatar" de cada card de vaga
const CANDIDATAR_Y = [1835, 2439, 3043, 3649, 4253, 5027];

const PAGES = [
  { n: 1, x: 765 }, { n: 2, x: 825 }, { n: 3, x: 885 }, { n: 4, x: 945 },
];

export default function Vagas() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/vagas-logado", { replace: true });
  }, [user, navigate]);

  const [cargo, setCargo] = useState("");
  const [regiao, setRegiao] = useState("");
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);

  const toggleFilter = (id: string) => setOpenFilters(s => ({ ...s, [id]: !s[id] }));
  const limparFiltros = () => { setOpenFilters({}); setCargo(""); setRegiao(""); };

  const searchInput: React.CSSProperties = {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    background: "transparent", border: "none", outline: "none",
    fontFamily: BD, color: "#3a2f22", letterSpacing: "0.5px",
    fontSize: "1vw", padding: "0 4vw 0 3.2vw", boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      <img
        src={vagasSvg}
        alt="Vagas — CLIMB"
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
        <AuthNavSlot x={x} y={y} w={w} h={h} />

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

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1745), top: y(1660), width: w(80), height: h(80),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: "50%" }} />

        {/* ── Busca ── */}
        <div style={{ position: "absolute", left: x(215), top: y(1085), width: w(730), height: h(80),
          pointerEvents: "auto" }}>
          <input type="text" placeholder="" value={cargo} onChange={e => setCargo(e.target.value)}
            style={searchInput} aria-label="Cargo ou palavra-chave" />
        </div>
        <div style={{ position: "absolute", left: x(965), top: y(1085), width: w(700), height: h(80),
          pointerEvents: "auto" }}>
          <input type="text" placeholder="" value={regiao} onChange={e => setRegiao(e.target.value)}
            style={searchInput} aria-label="Região, bairro ou zona" />
        </div>

        {/* ── Filtros (visual — sem menu dropdown ainda) ── */}
        {FILTERS.map(f => (
          <button key={f.id} type="button" aria-label={f.label} aria-pressed={!!openFilters[f.id]}
            onClick={() => toggleFilter(f.id)}
            style={{
              position: "absolute", left: x(f.x), top: y(f.y), width: w(f.w), height: h(f.h),
              pointerEvents: "auto", background: "transparent",
              border: openFilters[f.id] ? `2px solid ${LAV}` : "none",
              borderRadius: 999, cursor: "pointer", boxSizing: "border-box",
            }} />
        ))}
        <button type="button" onClick={limparFiltros} aria-label="Limpar filtros"
          style={{ position: "absolute", left: x(855), top: y(1315), width: w(190), height: h(40),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }} />

        {/* ── Botões "Quero me candidatar" (levam pro Cadastro) ── */}
        {CANDIDATAR_Y.map((cy, i) => (
          <button key={i} type="button" onClick={() => navigate("/cadastro")}
            aria-label="Quero me candidatar"
            style={{ position: "absolute", left: x(410), top: y(cy), width: w(460), height: h(90),
              pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
              borderRadius: 999 }} />
        ))}

        {/* ── Paginação (visual) ── */}
        {PAGES.map(p => (
          <button key={p.n} type="button" onClick={() => setPage(p.n)}
            aria-label={`Página ${p.n}`} aria-current={page === p.n}
            style={{ position: "absolute", left: x(p.x), top: y(5255), width: w(45), height: h(55),
              pointerEvents: "auto", background: "transparent", border: page === p.n ? `2px solid ${CREAM}` : "none",
              borderRadius: "0.4vw", cursor: "pointer", boxSizing: "border-box" }} />
        ))}
        <button type="button" onClick={() => setPage(p => Math.min(p + 1, 4))} aria-label="Próxima página"
          style={{ position: "absolute", left: x(1040), top: y(5260), width: w(160), height: h(50),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer" }} />

        {/* ── CTA final ── */}
        <button type="button" aria-label="Ver cursos"
          style={{ position: "absolute", left: x(655), top: y(6030), width: w(275), height: h(65),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />
        <button type="button" onClick={() => navigate("/perfil")} aria-label="Montar currículo"
          style={{ position: "absolute", left: x(970), top: y(6030), width: w(285), height: h(65),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />

        {/* ── Footer logo → home ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(404), top: y(6375), width: w(140), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB footer" />

      </div>
    </div>
  );
}
