import { createContext, useCallback, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import type { DBUsuario } from "@/database/userQueries";

const USER_ID_KEY = "@bitprogress_user_id";

interface UserContextType {
  userId: number | null;
  usuario: DBUsuario | null;
  isLoading: boolean;
  setUsuario: (user: DBUsuario) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  usuario: null,
  isLoading: true,
  setUsuario: () => {},
  logout: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [usuario, setUsuario] = useState<DBUsuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_ID_KEY).then((value) => {
      if (value) {
        setUserId(Number(value));
      }
      setIsLoading(false);
    });
  }, []);

  const setUsuarioFn = useCallback((user: DBUsuario) => {
    setUsuario(user);
    setUserId(user.id_usuario);
    AsyncStorage.setItem(USER_ID_KEY, String(user.id_usuario));
  }, []);

  const logout = useCallback(async () => {
    setUsuario(null);
    setUserId(null);
    await AsyncStorage.removeItem(USER_ID_KEY);
  }, []);

  return (
    <UserContext.Provider
      value={{ userId, usuario, isLoading, setUsuario: setUsuarioFn, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
