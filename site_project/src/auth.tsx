import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "climb_auth";

type AuthUser = { name: string } | null;

type AuthContextValue = {
  user: AuthUser;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(() => readStoredUser());

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue sem persistir
    }
  }, [user]);

  const login = (name: string) => setUser({ name: name.trim() || "Você" });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de um <AuthProvider>");
  return ctx;
}
