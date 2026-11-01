import { createContext, useCallback, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { achievements } from "@/constants/achievements";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "@/context/UserContext";
import { getProgresoMapByExternalId } from "@/database/queries";

const STORAGE_KEY_PREFIX = "@bitprogress_achievements_";

interface AchievementsContextType {
  unlockedIds: string[];
  modalShownIds: string[];
  isUnlocked: (id: string) => boolean;
  pendingAchievementId: string | null;
  showAchievementModal: (id: string) => void;
  dismissAchievement: () => void;
  checkUnlocks: () => Promise<string | null>;
  resetAchievements: () => Promise<void>;
}

const AchievementsContext = createContext<AchievementsContextType>({
  unlockedIds: [],
  modalShownIds: [],
  isUnlocked: () => false,
  pendingAchievementId: null,
  showAchievementModal: () => {},
  dismissAchievement: () => {},
  checkUnlocks: async () => null,
  resetAchievements: async () => {},
});

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [modalShownIds, setModalShownIds] = useState<string[]>([]);
  const [pendingAchievementId, setPendingAchievementId] = useState<string | null>(null);
  const db = useSQLiteContext();
  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      setUnlockedIds([]);
      setModalShownIds([]);
      return;
    }
    const key = STORAGE_KEY_PREFIX + userId;
    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        try {
          const data = JSON.parse(value);
          setUnlockedIds(data.unlockedIds || []);
          setModalShownIds(data.modalShownIds || []);
        } catch {}
      } else {
        setUnlockedIds([]);
        setModalShownIds([]);
      }
    });
  }, [userId]);

  // Persistir ambos arrays cuando cambian
  useEffect(() => {
    if (userId) {
      AsyncStorage.setItem(STORAGE_KEY_PREFIX + userId, JSON.stringify({
        unlockedIds,
        modalShownIds
      }));
    }
  }, [unlockedIds, modalShownIds, userId]);

  const isUnlocked = useCallback(
    (id: string) => unlockedIds.includes(id),
    [unlockedIds],
  );

  const showAchievementModal = useCallback((id: string) => {
    setPendingAchievementId(id);
  }, []);

  const dismissAchievement = useCallback((achievementId?: string) => {
    setPendingAchievementId(null);
    if (achievementId) {
      setModalShownIds(prev => [...prev, achievementId]);
    }
  }, []);

  const persist = useCallback(async (ids: string[]) => {
    setUnlockedIds(ids);
    if (userId) {
      await AsyncStorage.setItem(STORAGE_KEY_PREFIX + userId, JSON.stringify({
        unlockedIds: ids,
        modalShownIds: [...modalShownIds]
      }));
    }
  }, [modalShownIds, userId]);

  const markAchievementShown = useCallback((id: string) => {
    setModalShownIds(prev => [...prev, id]);
  }, []);

  const checkUnlocks = useCallback(async (): Promise<string | null> => {
    if (!userId) return null;
    try {
      const progresoMap = await getProgresoMapByExternalId(db, userId);
      for (const ach of achievements) {
        if (unlockedIds.includes(ach.id)) continue;

        const prog = progresoMap[ach.lessonId];
        if (prog && prog.lessonDone && prog.evalDone) {
          const newIds = [...unlockedIds, ach.id];
          await persist(newIds);
          return ach.id;
        }
      }
    } catch {}
    return null;
  }, [unlockedIds, persist, userId, db]);

  const resetAchievements = useCallback(async () => {
    if (userId) {
      await AsyncStorage.removeItem(STORAGE_KEY_PREFIX + userId);
    }
    setUnlockedIds([]);
    setModalShownIds([]);
  }, [userId]);

  return (
    <AchievementsContext.Provider
      value={{
        unlockedIds,
        modalShownIds,
        isUnlocked,
        pendingAchievementId,
        showAchievementModal,
        dismissAchievement,
        checkUnlocks,
        resetAchievements,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  return useContext(AchievementsContext);
}