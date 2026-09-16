import { createBrowserRouter } from "react-router";
import App from "./App";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Vagas from "./pages/Vagas";
import VagasLogado from "./pages/VagasLogado";
import Cursos from "./pages/Cursos";
import Consultoria from "./pages/Consultoria";
import TrilhasTestes from "./pages/TrilhasTestes";
import Workshop from "./pages/Workshop";
import Templates from "./pages/Templates";
import NetworkingEventos from "./pages/NetworkingEventos";
import NetworkingGrupos from "./pages/NetworkingGrupos";
import NetworkingEmpresas from "./pages/NetworkingEmpresas";
import Planos from "./pages/Planos";
import Parceiros from "./pages/Parceiros";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/cadastro",
    Component: Cadastro,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/perfil",
    Component: Perfil,
  },
  {
    path: "/vagas",
    Component: Vagas,
  },
  {
    path: "/vagas-logado",
    Component: VagasLogado,
  },
  {
    path: "/cursos",
    Component: Cursos,
  },
  {
    path: "/cursos/consultoria",
    Component: Consultoria,
  },
  {
    path: "/cursos/trilhas-e-testes",
    Component: TrilhasTestes,
  },
  {
    path: "/cursos/workshop",
    Component: Workshop,
  },
  {
    path: "/templates",
    Component: Templates,
  },
  {
    path: "/networking/eventos",
    Component: NetworkingEventos,
  },
  {
    path: "/networking/grupos",
    Component: NetworkingGrupos,
  },
  {
    path: "/networking/empresas",
    Component: NetworkingEmpresas,
  },
  {
    path: "/planos",
    Component: Planos,
  },
  {
    path: "/parceiros",
    Component: Parceiros,
  },
]);
