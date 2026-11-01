import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "@/context/UserContext";
import { getUsuarioById } from "@/database/userQueries";
import { updateUsuarioXP } from "@/database/queries";

const XP_PER_LESSON = 20;

interface XPContextType {
  totalXP: number;
  addLessonXP: (amount?: number) => Promise<void>;
  resetXP: () => Promise<void>;
}

const XPContext = createContext<XPContextType>({
  totalXP: 0,
  addLessonXP: async () => {},
  resetXP: async () => {},
});

export function XPProvider({ children }: { children: React.ReactNode }) {
  const [totalXP, setTotalXP] = useState(0);
  const db = useSQLiteContext();
  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      setTotalXP(0);
      return;
    }
    let cancelled = false;
    getUsuarioById(db, userId).then((u) => {
      if (!cancelled && u) setTotalXP(u.xp_total);
    });
    return () => { cancelled = true; };
  }, [userId, db]);

  const addLessonXP = useCallback(async (amount: number = XP_PER_LESSON) => {
    if (!userId) return;
    const newXp = totalXP + amount;
    setTotalXP(newXp);
    await updateUsuarioXP(db, userId, newXp);
  }, [totalXP, userId, db]);

  const resetXP = useCallback(async () => {
    if (!userId) return;
    setTotalXP(0);
    await updateUsuarioXP(db, userId, 0);
  }, [userId, db]);

  return (
    <XPContext.Provider value={{ totalXP, addLessonXP, resetXP }}>
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  return useContext(XPContext);
}
