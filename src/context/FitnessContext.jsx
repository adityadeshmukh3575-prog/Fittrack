import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredWorkouts,
  saveStoredWorkouts,
  getStoredHistory,
  saveStoredHistory,
  getStoredGoals,
  saveStoredGoals,
  getStoredProfile,
  saveStoredProfile,
  getStoredTheme,
  saveStoredTheme,
  resetAllToDefaults
} from '../utils/storage.js';
import { calculateStreaks, calculateDashboardStats, calculateWeeklyActivity, normalizeDate } from '../utils/calculations.js';

const FitnessContext = createContext(null);

export const FitnessProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(getStoredWorkouts);
  const [history, setHistory] = useState(getStoredHistory);
  const [goals, setGoals] = useState(getStoredGoals);
  const [userProfile, setUserProfile] = useState(getStoredProfile);
  const [theme, setTheme] = useState(getStoredTheme);

  // Navigation SPA active tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Modals & Active Workout state
  const [activeWorkoutSession, setActiveWorkoutSession] = useState(null);
  const [openManualLogModal, setOpenManualLogModal] = useState(false);
  const [openAddGoalModal, setOpenAddGoalModal] = useState(false);
  const [selectedWorkoutDetails, setSelectedWorkoutDetails] = useState(null);
  const [goalToUpdate, setGoalToUpdate] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Sync theme to HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  // Sync state changes to storage
  useEffect(() => {
    saveStoredWorkouts(workouts);
  }, [workouts]);

  useEffect(() => {
    saveStoredHistory(history);
  }, [history]);

  useEffect(() => {
    saveStoredGoals(goals);
  }, [goals]);

  useEffect(() => {
    saveStoredProfile(userProfile);
  }, [userProfile]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Automated goal updater helper when workout is logged
  const autoUpdateGoalsOnWorkout = (workoutData) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        let updatedCurrent = goal.current;
        let updatedStatus = goal.status;

        // Workout frequency goal
        if (goal.type === 'Workout frequency' || goal.category === 'frequency') {
          updatedCurrent = Math.min(goal.target, goal.current + 1);
        }
        // Calories burned goal
        else if (goal.type === 'Calories burned' || goal.category === 'energy') {
          const cal = Number(workoutData.calories) || 0;
          updatedCurrent = goal.current + cal;
        }

        if (updatedCurrent >= goal.target) {
          updatedStatus = 'Completed';
        }

        return {
          ...goal,
          current: updatedCurrent,
          status: updatedStatus
        };
      })
    );
  };

  // Start interactive workout
  const startWorkout = (workout) => {
    const session = {
      workoutId: workout.id,
      name: workout.name,
      category: workout.category,
      difficulty: workout.difficulty,
      estimatedDuration: workout.duration,
      estimatedCalories: workout.calories,
      exercises: workout.exercises || [],
      currentExerciseIndex: 0,
      startTime: Date.now(),
      elapsedSeconds: 0,
      isPaused: false,
      completedSets: {}, // { [exerciseIndex]: number_of_completed_sets }
      notes: ''
    };
    setActiveWorkoutSession(session);
  };

  // Finish interactive workout
  const finishActiveWorkout = (finalSession) => {
    const durationMinutes = Math.max(1, Math.round(finalSession.elapsedSeconds / 60) || finalSession.estimatedDuration || 30);
    // Adjust calories proportional to time or default estimate
    const caloriesBurned = Math.round((finalSession.estimatedCalories || 350) * Math.min(2, Math.max(0.6, durationMinutes / (finalSession.estimatedDuration || 30))));

    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      name: finalSession.name,
      type: finalSession.category || 'Strength',
      duration: durationMinutes,
      calories: caloriesBurned,
      date: normalizeDate(new Date()),
      status: 'Completed',
      exercisesCompleted: finalSession.exercises.length,
      totalExercises: finalSession.exercises.length,
      notes: finalSession.notes || `Completed ${finalSession.exercises.length} exercises with high intensity!`
    };

    setHistory((prev) => [newHistoryEntry, ...prev]);
    autoUpdateGoalsOnWorkout(newHistoryEntry);
    setActiveWorkoutSession(null);
    showToast(`Workout Complete! 🎉 Burned ${caloriesBurned} kcal in ${durationMinutes} min.`);
  };

  const cancelWorkoutSession = () => {
    setActiveWorkoutSession(null);
  };

  // Manual Workout Logging
  const logManualWorkout = (workoutData) => {
    const newEntry = {
      id: `hist-${Date.now()}`,
      name: workoutData.name.trim(),
      type: workoutData.type,
      duration: Number(workoutData.duration),
      calories: Number(workoutData.calories),
      date: workoutData.date || normalizeDate(new Date()),
      status: 'Completed',
      exercisesCompleted: workoutData.exercisesCompleted || 1,
      totalExercises: workoutData.exercisesCompleted || 1,
      notes: workoutData.notes ? workoutData.notes.trim() : 'Manually recorded workout'
    };

    setHistory((prev) => [newEntry, ...prev]);
    autoUpdateGoalsOnWorkout(newEntry);
    setOpenManualLogModal(false);
    showToast(`Workout "${newEntry.name}" logged successfully! 🔥`);
  };

  // Delete workout from history
  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Workout entry deleted from history.', 'info');
  };

  // Add new Goal
  const addGoal = (goalData) => {
    const newGoal = {
      id: `goal-${Date.now()}`,
      title: goalData.title.trim(),
      type: goalData.type,
      current: Number(goalData.current) || 0,
      target: Number(goalData.target) || 1,
      unit: goalData.unit || 'units',
      deadline: goalData.deadline,
      status: Number(goalData.current) >= Number(goalData.target) ? 'Completed' : 'In Progress',
      category: goalData.type.toLowerCase().includes('run') ? 'cardio' : goalData.type.toLowerCase().includes('step') ? 'activity' : 'frequency'
    };

    setGoals((prev) => [newGoal, ...prev]);
    setOpenAddGoalModal(false);
    showToast(`Goal "${newGoal.title}" created! 🎯`);
  };

  // Update Goal progress
  const updateGoalProgress = (id, newCurrent) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const currentVal = Number(newCurrent);
        const isCompleted = currentVal >= g.target;
        return {
          ...g,
          current: currentVal,
          status: isCompleted ? 'Completed' : 'In Progress'
        };
      })
    );
    setGoalToUpdate(null);
    showToast('Goal progress updated successfully! 📈');
  };

  // Delete Goal
  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    showToast('Goal removed.', 'info');
  };

  // Update User Profile
  const updateUserProfile = (newProfile) => {
    setUserProfile((prev) => ({ ...prev, ...newProfile }));
    showToast('Profile and preferences updated! ⚙️');
  };

  // Reset to sample data
  const handleResetToDefaults = () => {
    resetAllToDefaults();
    setWorkouts(getStoredWorkouts());
    setHistory(getStoredHistory());
    setGoals(getStoredGoals());
    setUserProfile(getStoredProfile());
    showToast('FitTrack restored to rich sample data! 🔄');
  };

  // Computed data
  const dashboardStats = calculateDashboardStats(history, userProfile);
  const weeklyActivity = calculateWeeklyActivity(history);
  const { currentStreak, bestStreak } = calculateStreaks(history);

  return (
    <FitnessContext.Provider
      value={{
        workouts,
        setWorkouts,
        history,
        goals,
        userProfile,
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        dashboardStats,
        weeklyActivity,
        currentStreak,
        bestStreak,
        // Actions
        startWorkout,
        activeWorkoutSession,
        setActiveWorkoutSession,
        finishActiveWorkout,
        cancelWorkoutSession,
        logManualWorkout,
        deleteHistoryItem,
        addGoal,
        updateGoalProgress,
        deleteGoal,
        updateUserProfile,
        handleResetToDefaults,
        // Modals & UI helpers
        openManualLogModal,
        setOpenManualLogModal,
        openAddGoalModal,
        setOpenAddGoalModal,
        selectedWorkoutDetails,
        setSelectedWorkoutDetails,
        goalToUpdate,
        setGoalToUpdate,
        toast,
        showToast
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
