import { initialWorkoutTemplates } from '../data/workouts.js';
import { initialUserProfile, initialGoals, initialWorkoutHistory } from '../data/initialData.js';

const KEYS = {
  WORKOUTS: 'fittrack_workout_templates_v2',
  HISTORY: 'fittrack_workout_history_v2',
  GOALS: 'fittrack_goals_v2',
  PROFILE: 'fittrack_user_profile_v2',
  THEME: 'fittrack_theme_mode'
};

export const getStoredWorkouts = () => {
  try {
    const raw = localStorage.getItem(KEYS.WORKOUTS);
    if (!raw) {
      localStorage.setItem(KEYS.WORKOUTS, JSON.stringify(initialWorkoutTemplates));
      return initialWorkoutTemplates;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading workouts from storage', e);
    return initialWorkoutTemplates;
  }
};

export const saveStoredWorkouts = (workouts) => {
  try {
    localStorage.setItem(KEYS.WORKOUTS, JSON.stringify(workouts));
  } catch (e) {
    console.error('Failed saving workouts', e);
  }
};

export const getStoredHistory = () => {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (!raw) {
      localStorage.setItem(KEYS.HISTORY, JSON.stringify(initialWorkoutHistory));
      return initialWorkoutHistory;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading history from storage', e);
    return initialWorkoutHistory;
  }
};

export const saveStoredHistory = (history) => {
  try {
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed saving history', e);
  }
};

export const getStoredGoals = () => {
  try {
    const raw = localStorage.getItem(KEYS.GOALS);
    if (!raw) {
      localStorage.setItem(KEYS.GOALS, JSON.stringify(initialGoals));
      return initialGoals;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading goals from storage', e);
    return initialGoals;
  }
};

export const saveStoredGoals = (goals) => {
  try {
    localStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
  } catch (e) {
    console.error('Failed saving goals', e);
  }
};

export const getStoredProfile = () => {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(initialUserProfile));
      return initialUserProfile;
    }
    const parsed = JSON.parse(raw);
    if (parsed && (parsed.name === 'Sam' || !parsed.name)) {
      parsed.name = 'Aditya';
      if (parsed.email === 'sam.athlete@fittrack.io') {
        parsed.email = 'aditya.athlete@fittrack.io';
      }
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error('Failed reading profile from storage', e);
    return initialUserProfile;
  }
};

export const saveStoredProfile = (profile) => {
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed saving profile', e);
  }
};

export const getStoredTheme = () => {
  try {
    const raw = localStorage.getItem(KEYS.THEME);
    if (!raw) {
      // Default to light or check system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return raw;
  } catch (e) {
    return 'light';
  }
};

export const saveStoredTheme = (theme) => {
  try {
    localStorage.setItem(KEYS.THEME, theme);
  } catch (e) {
    console.error('Failed saving theme', e);
  }
};

export const resetAllToDefaults = () => {
  try {
    localStorage.setItem(KEYS.WORKOUTS, JSON.stringify(initialWorkoutTemplates));
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(initialWorkoutHistory));
    localStorage.setItem(KEYS.GOALS, JSON.stringify(initialGoals));
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(initialUserProfile));
  } catch (e) {
    console.error('Failed resetting data', e);
  }
};
