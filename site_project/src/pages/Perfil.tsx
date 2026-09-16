import { useState } from "react";
import { Link, useNavigate } from "react-router";
import perfilSvg from "../../imports/04_-_TELA_PERFIL__1_.svg";
import NavDropdown from "../components/NavDropdown";
import AuthNavSlot from "../components/AuthNavSlot";

/*
  Strategy: same as Login.tsx / Cadastro.tsx — the original Figma SVG is
  shown as a full-width image (guarantees 100% pixel-accurate design),
  and interactive elements are overlaid using percentage-based positions
  derived from the SVG's own coordinate space.

  SVG canvas: 1900 × 8925
  Coordinates below were extracted from the exported SVG via OCR +
  contour detection, so they line up with the real inputs/checkboxes
  drawn in the design.
*/
const W = 1900;
const H = 8925;

const x = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const y = (v: number) => `${((v / H) * 100).toFixed(4)}%`;
const w = (v: number) => `${((v / W) * 100).toFixed(4)}%`;
const h = (v: number) => `${((v / H) * 100).toFixed(4)}%`;

const BLUE  = "#555CF0";
const LAV   = "#A2A6F2";
const CREAM = "#fff0da";
const BD    = "'Franklin Gothic Demi:Regular','Barlow',Arial,sans-serif";

// ─────────────────────────────────────────────────────────
// Text / file fields (label kept only as a code comment aid)
// ─────────────────────────────────────────────────────────
type FieldDef = { id: string; x: number; y: number; w: number; h: number; type?: string; label: string };

const TEXT_FIELDS: FieldDef[] = [
  { id: "nome",        x: 425, y: 1125, w: 1061, h: 73, label: "Nome completo" },
  { id: "nascimento",  x: 425, y: 1287, w: 340,  h: 73, label: "Data de nascimento" },
  { id: "cidade",      x: 782, y: 1287, w: 335,  h: 73, label: "Cidade" },
  { id: "estado",      x: 1134,y: 1287, w: 154,  h: 73, label: "Estado" },
  { id: "email",       x: 425, y: 1449, w: 1061, h: 73, type: "email", label: "E-mail" },
  { id: "celular",     x: 425, y: 1611, w: 356,  h: 73, type: "tel",   label: "Celular" },
  { id: "genero",      x: 800, y: 1611, w: 335,  h: 73, label: "Gênero" },
  { id: "pronome",     x: 1154,y: 1611, w: 234,  h: 73, label: "Pronome" },
  { id: "cor",         x: 739, y: 1773, w: 265,  h: 73, label: "Cor" },
  { id: "curso",       x: 425, y: 2218, w: 1062, h: 73, label: "Curso ou área de formação" },
  { id: "instituicao", x: 425, y: 2389, w: 1062, h: 73, label: "Instituição de ensino" },
  { id: "curriculo",   x: 425, y: 3464, w: 401,  h: 73, type: "file", label: "Anexe seu currículo" },
  { id: "portfolioAnexo", x: 869, y: 3464, w: 465, h: 73, type: "file", label: "Anexe seu portfólio" },
  { id: "interessePrincipal", x: 420, y: 6020, w: 1066, h: 73, label: "Área de interesse principal" },
  { id: "talentos",    x: 420, y: 6177, w: 1066, h: 73, label: "Maiores talentos" },
  { id: "aprender",    x: 420, y: 6334, w: 1066, h: 73, label: "O que gostaria de aprender" },
  { id: "tempoLivre",  x: 420, y: 6491, w: 1066, h: 73, label: "O que gosta de fazer no tempo livre" },
  { id: "hobbies",     x: 420, y: 6648, w: 1066, h: 73, label: "Hobbies favoritos" },
  { id: "curiosidade", x: 420, y: 6805, w: 1066, h: 73, label: "Curiosidade sobre mim" },
  { id: "inspiracao",  x: 420, y: 6962, w: 1066, h: 73, label: "Me inspiro em" },
];

// ─────────────────────────────────────────────────────────
// Checkboxes (all independent toggles; visually square, like
// the Figma design — grouped ones aren't mutually exclusive
// yet, easy to add later if you want radio-style behaviour)
// ─────────────────────────────────────────────────────────
type BoxDef = { id: string; x: number; y: number; label: string };

const CHECKBOXES: BoxDef[] = [
  { id: "pcdSim", x: 425, y: 1773, label: "PCD? Sim" },
  { id: "pcdNao", x: 566, y: 1773, label: "PCD? Não" },

  { id: "escCursando", x: 425, y: 2070, label: "Cursando graduação" },
  { id: "escCompleta", x: 814, y: 2070, label: "Graduação completa" },

  { id: "trabalhaSim", x: 425, y: 2560, label: "Já trabalha na área? Sim" },
  { id: "trabalhaNao", x: 566, y: 2560, label: "Já trabalha na área? Não" },

  { id: "buscaEstagio",   x: 425,  y: 2708, label: "Estágio" },
  { id: "buscaTrainee",   x: 613,  y: 2708, label: "Trainee" },
  { id: "buscaClt",       x: 801,  y: 2708, label: "CLT" },
  { id: "buscaPortfolio", x: 940,  y: 2708, label: "Portfólio" },
  { id: "buscaCursos",    x: 1143, y: 2708, label: "Cursos" },
  { id: "buscaOutros",    x: 1326, y: 2708, label: "Outros" },

  { id: "objDesenvolver", x: 420,  y: 2981, label: "Me desenvolver profissionalmente" },
  { id: "objVaga",        x: 982,  y: 2981, label: "Encontrar uma vaga na área" },
  { id: "objMudar",       x: 420,  y: 3078, label: "Mudar de área dentro da comunicação" },
  { id: "objDestacar",    x: 1042, y: 3078, label: "Me destacar no mercado" },
  { id: "objNegocio",     x: 420,  y: 3175, label: "Criar meu próprio negócio ou marca" },

  { id: "areaDesign",        x: 425,  y: 4197, label: "Design gráfico" },
  { id: "areaRedacao",       x: 719,  y: 4197, label: "Redação publicitária" },
  { id: "areaAudiovisual",   x: 1088, y: 4197, label: "Audiovisual" },
  { id: "areaSocial",        x: 425,  y: 4294, label: "Social media" },
  { id: "areaBranding",      x: 689,  y: 4294, label: "Branding e estratégia" },
  { id: "areaUxui",          x: 1070, y: 4294, label: "UX/UI" },
  { id: "areaProducao",      x: 425,  y: 4391, label: "Produção de conteúdo" },
  { id: "areaFoto",          x: 835,  y: 4391, label: "Fotografia/Vídeo" },
  { id: "areaMarketing",     x: 1150, y: 4391, label: "Marketing de influência" },
  { id: "areaInstitucional", x: 425,  y: 4488, label: "Comunicação institucional" },
  { id: "areaOutros",        x: 875,  y: 4488, label: "Outros" },

  { id: "habPhotoshop",   x: 425,  y: 4744, label: "Adobe Photoshop" },
  { id: "habIllustrator", x: 754,  y: 4744, label: "Adobe Illustrator" },
  { id: "habPremiere",    x: 1068, y: 4744, label: "Adobe Premiere" },
  { id: "habAfterEffects",x: 425,  y: 4841, label: "After Effects" },
  { id: "habFigma",       x: 681,  y: 4841, label: "Figma" },
  { id: "habCanva",       x: 855,  y: 4841, label: "Canva" },
  { id: "habExcel",       x: 1034, y: 4841, label: "Excel / Google Sheets" },
  { id: "habSeo",         x: 425,  y: 4938, label: "Noções de SEO" },
  { id: "habConteudo",    x: 723,  y: 4938, label: "Criação de conteúdo para redes" },
  { id: "habTextos",      x: 425,  y: 5035, label: "Produção de textos publicitários" },
  { id: "habVideo",       x: 953,  y: 5035, label: "Edição de vídeo" },
  { id: "habOutros",      x: 1268, y: 5035, label: "Outros" },

  { id: "softCriatividade", x: 422, y: 5312, label: "Criatividade" },
  { id: "softOrganizacao",  x: 673, y: 5312, label: "Organização" },
  { id: "softProatividade", x: 932, y: 5312, label: "Proatividade" },
  { id: "softLideranca",    x: 1193,y: 5312, label: "Liderança" },
  { id: "softEquipe",       x: 422, y: 5409, label: "Trabalho em equipe" },
  { id: "softComunicacao",  x: 779, y: 5409, label: "Comunicação" },

  { id: "trabPresencial", x: 422, y: 5559, label: "Presencial" },
  { id: "trabHibrido",    x: 673, y: 5559, label: "Híbrido" },
  { id: "trabRemoto",     x: 862, y: 5559, label: "Remoto" },

  { id: "mudancaSim",    x: 422, y: 5709, label: "Disponível p/ mudar de cidade: Sim" },
  { id: "mudancaNao",    x: 574, y: 5709, label: "Disponível p/ mudar de cidade: Não" },
  { id: "mudancaTalvez", x: 720, y: 5709, label: "Disponível p/ mudar de cidade: Talvez" },

  { id: "mentoriaSim", x: 425, y: 7265, label: "Quer mentoria? Sim" },
  { id: "mentoriaNao", x: 567, y: 7265, label: "Quer mentoria? Não por agora" },

  { id: "eventosSim",    x: 425, y: 7445, label: "Interesse em eventos? Sim" },
  { id: "eventosNao",    x: 577, y: 7445, label: "Interesse em eventos? Não" },
  { id: "eventosTalvez", x: 723, y: 7445, label: "Interesse em eventos? Talvez" },
];

const BOX_W = 50;
const BOX_H = 50;

export default function Perfil() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const setValue = (id: string, v: string) => setValues(s => ({ ...s, [id]: v }));
  const toggle = (id: string) => setChecked(s => ({ ...s, [id]: !s[id] }));

  const inputBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    fontFamily: BD,
    color: `${CREAM}99`,
    letterSpacing: "1px",
    fontSize: "1vw",
    padding: "0 2.5vw",
    boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "#080808" }}>
      {/* ── Full-page SVG image — exact Figma design ── */}
      <img
        src={perfilSvg}
        alt="Perfil do usuário — CLIMB"
        style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}
        draggable={false}
      />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

        {/* ── Navbar (logo / login / cadastro — mesmo padrão das outras páginas) ── */}
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

        <AuthNavSlot x={x} y={y} w={w} h={h} />

        {/* ── Libras ── */}
        <button aria-label="Acessibilidade em Libras"
          style={{ position: "absolute", left: x(1781), top: y(854), width: w(62), height: h(62),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: "50%" }} />

        {/* ── Editar foto de perfil (visual — upload real de foto fica pra uma próxima etapa) ── */}
        <button aria-label="Editar foto de perfil"
          style={{ position: "absolute", left: x(525), top: y(845), width: w(295), height: h(70),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />

        {/* ── Text / file fields ── */}
        {TEXT_FIELDS.map(f => (
          <div key={f.id}
            style={{
              position: "absolute", left: x(f.x), top: y(f.y), width: w(f.w), height: h(f.h),
              pointerEvents: "auto",
              border: `2px solid ${focused === f.id ? LAV : "transparent"}`,
              borderRadius: "0.6vw", boxSizing: "border-box", transition: "border-color .2s",
            }}>
            {f.type === "file" ? (
              <input
                type="file"
                onChange={e => setValue(f.id, e.target.files?.[0]?.name ?? "")}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
                style={{ ...inputBase, opacity: 0, cursor: "pointer" }}
                aria-label={f.label}
              />
            ) : (
              <input
                type={f.type ?? "text"}
                value={values[f.id] ?? ""}
                onChange={e => setValue(f.id, e.target.value)}
                onFocus={() => setFocused(f.id)}
                onBlur={() => setFocused(null)}
                style={inputBase}
                aria-label={f.label}
              />
            )}
            {f.type === "file" && values[f.id] && (
              <span style={{
                position: "absolute", right: "1vw", top: "50%", transform: "translateY(-50%)",
                fontFamily: BD, fontSize: "0.75vw", color: LAV, maxWidth: "60%",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                pointerEvents: "none",
              }}>{values[f.id]}</span>
            )}
          </div>
        ))}

        {/* ── Checkboxes ── */}
        {CHECKBOXES.map(b => (
          <button
            key={b.id}
            type="button"
            aria-label={b.label}
            aria-pressed={!!checked[b.id]}
            onClick={() => toggle(b.id)}
            style={{
              position: "absolute", left: x(b.x), top: y(b.y), width: w(BOX_W), height: h(BOX_H),
              pointerEvents: "auto", background: checked[b.id] ? `${BLUE}55` : "transparent",
              border: "none", borderRadius: "0.4vw", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .15s",
            }}
          >
            {checked[b.id] && (
              <svg viewBox="0 0 24 24" fill="none" stroke={CREAM} strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ width: "55%", height: "55%" }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}

        {/* ── Acesse modelos de currículo e portfólio (leva pra Cadastro por enquanto — sem página própria ainda) ── */}
        <button
          onClick={() => navigate("/cadastro")}
          aria-label="Acesse modelos de currículo e portfólio"
          style={{ position: "absolute", left: x(965), top: y(3855), width: w(420), height: h(60),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />

        {/* ── Salvar perfil (CTA principal) ── */}
        <button
          onClick={() => navigate("/vagas-logado")}
          aria-label="Salvar perfil"
          style={{ position: "absolute", left: x(815), top: y(7790), width: w(265), height: h(75),
            pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer",
            borderRadius: 999 }} />

        {/* ── Footer logo → home ── */}
        <Link to="/"
          style={{ position: "absolute", left: x(404), top: y(8265), width: w(140), height: h(50),
            pointerEvents: "auto", display: "block" }}
          aria-label="CLIMB footer" />

      </div>
    </div>
  );
}
