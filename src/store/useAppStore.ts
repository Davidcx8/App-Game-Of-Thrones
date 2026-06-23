import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NobleTitle =
  | 'Salvaje'
  | 'Miembro de la Guardia de la Noche'
  | 'Señor del Norte'
  | 'Mano del Rey'
  | 'Rey de los Ándalos';

interface AppState {
  completedCategories: string[];
  categoryScores: Record<string, number>;
  totalScore: number;
  currentSessionId: string | null;
  soundEnabled: boolean;
  sfxEnabled: boolean;

  startSession: (categoryId: string) => void;
  resetSession: () => void;
  completeCategory: (categoryId: string, score: number) => void;
  resetAll: () => void;
  getTitle: () => NobleTitle;
  toggleSound: () => void;
  toggleSfx: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      completedCategories: [],
      categoryScores: {},
      totalScore: 0,
      currentSessionId: null,
      soundEnabled: true,
      sfxEnabled: true,

      startSession: (categoryId: string) => {
        set({ currentSessionId: categoryId });
      },

      resetSession: () => {
        set({ currentSessionId: null });
      },

      completeCategory: (categoryId: string, score: number) => {
        set(state => {
          const isFirstTime = !state.completedCategories.includes(categoryId);
          const prevScore = state.categoryScores[categoryId] || 0;

          let newCompleted = state.completedCategories;
          if (isFirstTime) {
            newCompleted = [...state.completedCategories, categoryId];
          }

          const newCategoryScores = { ...state.categoryScores };
          if (score > prevScore) {
            newCategoryScores[categoryId] = score;
          }

          const newTotalScore = Object.values(newCategoryScores).reduce((a, b) => a + b, 0);

          return {
            completedCategories: newCompleted,
            categoryScores: newCategoryScores,
            totalScore: newTotalScore,
          };
        });
      },

      resetAll: () => {
        set({
          completedCategories: [],
          categoryScores: {},
          totalScore: 0,
          currentSessionId: null,
        });
      },

      getTitle: () => {
        const score = get().totalScore;
        if (score >= 23) return 'Rey de los Ándalos';
        if (score >= 18) return 'Mano del Rey';
        if (score >= 13) return 'Señor del Norte';
        if (score >= 8) return 'Miembro de la Guardia de la Noche';
        return 'Salvaje';
      },

      toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),
      toggleSfx: () => set(s => ({ sfxEnabled: !s.sfxEnabled })),
    }),
    {
      name: 'got-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
