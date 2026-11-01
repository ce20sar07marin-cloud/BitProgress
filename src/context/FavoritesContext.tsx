import { createContext, useCallback, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/context/UserContext";

const FAVORITES_KEY_PREFIX = "@bitprogress_favorites_";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }
    const key = FAVORITES_KEY_PREFIX + userId;
    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        try {
          setFavorites(JSON.parse(value));
        } catch {}
      } else {
        setFavorites([]);
      }
    });
  }, [userId]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  useEffect(() => {
    if (!userId) return;
    AsyncStorage.setItem(FAVORITES_KEY_PREFIX + userId, JSON.stringify(favorites));
  }, [favorites, userId]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
