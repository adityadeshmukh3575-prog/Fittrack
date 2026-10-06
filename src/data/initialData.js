// Helper to produce relative ISO date strings (YYYY-MM-DD)
export const getRelativeDate = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const initialUserProfile = {
  name: 'Aditya',
  email: 'aditya.athlete@fittrack.io',
  fitnessGoal: 'Build Muscle & Endurance',
  preferredWorkout: 'Strength',
  dailyStepGoal: 10000,
  weeklyWorkoutGoal: 5,
  dailyCalorieTarget: 2500,
  todaySteps: 7420,
  weightKg: 76.5,
  heightCm: 178
};

export const initialGoals = [
  {
    id: 'goal-1',
    title: 'Complete 5 workouts this week',
    type: 'Workout frequency',
    current: 4,
    target: 5,
    unit: 'workouts',
    deadline: getRelativeDate(-3), // 3 days in future
    status: 'In Progress',
    category: 'frequency'
  },
  {
    id: 'goal-2',
    title: 'Run 20 km this month',
    type: 'Running distance',
    current: 14.5,
    target: 20,
    unit: 'km',
    deadline: getRelativeDate(-14),
    status: 'In Progress',
    category: 'cardio'
  },
  {
    id: 'goal-3',
    title: 'Reach 10,000 daily steps',
    type: 'Steps',
    current: 7420,
    target: 10000,
    unit: 'steps',
    deadline: getRelativeDate(0),
    status: 'In Progress',
    category: 'activity'
  },
  {
    id: 'goal-4',
    title: 'Burn 2,500 active kcal',
    type: 'Calories burned',
    current: 1850,
    target: 2500,
    unit: 'kcal',
    deadline: getRelativeDate(-2),
    status: 'In Progress',
    category: 'energy'
  },
  {
    id: 'goal-5',
    title: 'Bench Press 100 kg milestone',
    type: 'Strength goal',
    current: 100,
    target: 100,
    unit: 'kg',
    deadline: getRelativeDate(2),
    status: 'Completed',
    category: 'strength'
  }
];

export const initialWorkoutHistory = [
  {
    id: 'hist-1',
    name: 'Upper Body Blast',
    type: 'Strength',
    duration: 45,
    calories: 420,
    date: getRelativeDate(0), // Today
    status: 'Completed',
    exercisesCompleted: 6,
    totalExercises: 6,
    notes: 'Hit personal rep record on incline dumbbell press. Felt strong and focused.'
  },
  {
    id: 'hist-2',
    name: 'Morning Run',
    type: 'Cardio',
    duration: 35,
    calories: 310,
    date: getRelativeDate(1), // Yesterday
    status: 'Completed',
    exercisesCompleted: 4,
    totalExercises: 4,
    notes: 'Brisk 5k around the city park. Crisp morning air.'
  },
  {
    id: 'hist-3',
    name: 'Leg Day',
    type: 'Strength',
    duration: 50,
    calories: 410,
    date: getRelativeDate(2), // 2 days ago
    status: 'Completed',
    exercisesCompleted: 6,
    totalExercises: 6,
    notes: 'Heavy goblet squats and Bulgarian split squats. Quad pump was real.'
  },
  {
    id: 'hist-4',
    name: 'HIIT Burner',
    type: 'HIIT',
    duration: 35,
    calories: 440,
    date: getRelativeDate(3), // 3 days ago
    status: 'Completed',
    exercisesCompleted: 5,
    totalExercises: 5,
    notes: 'Intense interval rounds with kettlebell swings.'
  },
  {
    id: 'hist-5',
    name: 'Yoga Flow',
    type: 'Yoga',
    duration: 40,
    calories: 180,
    date: getRelativeDate(4), // 4 days ago
    status: 'Completed',
    exercisesCompleted: 5,
    totalExercises: 5,
    notes: 'Restorative evening session, opened up tight hips and thoracic spine.'
  },
  {
    id: 'hist-6',
    name: 'Chest & Triceps',
    type: 'Strength',
    duration: 45,
    calories: 370,
    date: getRelativeDate(5), // 5 days ago
    status: 'Completed',
    exercisesCompleted: 5,
    totalExercises: 5,
    notes: 'Solid lockouts on EZ-bar extensions.'
  },
  {
    id: 'hist-7',
    name: 'Mobility Session',
    type: 'Mobility',
    duration: 30,
    calories: 140,
    date: getRelativeDate(6), // 6 days ago (completes 7-day streak!)
    status: 'Completed',
    exercisesCompleted: 5,
    totalExercises: 5,
    notes: 'Focused on ankle dorsiflexion and deep hip capsule openers.'
  },
  {
    id: 'hist-8',
    name: 'Full Body Strength',
    type: 'Strength',
    duration: 60,
    calories: 520,
    date: getRelativeDate(8), // 8 days ago
    status: 'Completed',
    exercisesCompleted: 8,
    totalExercises: 8,
    notes: 'Compound barbell session with deadlifts and military press.'
  },
  {
    id: 'hist-9',
    name: 'Core Crusher',
    type: 'Full Body',
    duration: 25,
    calories: 220,
    date: getRelativeDate(9), // 9 days ago
    status: 'Completed',
    exercisesCompleted: 5,
    totalExercises: 5,
    notes: 'Planks and ab-wheel rollouts.'
  }
];
