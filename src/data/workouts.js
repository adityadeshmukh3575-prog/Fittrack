export const initialWorkoutTemplates = [
  {
    id: 'workout-1',
    name: 'Full Body Strength',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 45,
    calories: 420,
    description: 'Balanced compound movements targeting major muscle groups to build functional power and metabolic conditioning.',
    exercises: [
      { name: 'Barbell Back Squats', sets: 4, reps: '10 reps', restSec: 60, muscle: 'Quadriceps, Glutes' },
      { name: 'Dumbbell Bench Press', sets: 4, reps: '12 reps', restSec: 60, muscle: 'Pectorals, Triceps' },
      { name: 'Bent-Over Barbell Rows', sets: 3, reps: '12 reps', restSec: 60, muscle: 'Upper Back, Lats' },
      { name: 'Overhead Shoulder Press', sets: 3, reps: '10 reps', restSec: 45, muscle: 'Deltoids, Trapezius' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10 reps', restSec: 60, muscle: 'Hamstrings, Posterior Chain' },
      { name: 'Hanging Knee Raises', sets: 3, reps: '15 reps', restSec: 45, muscle: 'Core, Hip Flexors' },
      { name: 'Standing Dumbbell Curls', sets: 3, reps: '12 reps', restSec: 45, muscle: 'Biceps' },
      { name: 'Cable Rope Tricep Pushdowns', sets: 3, reps: '15 reps', restSec: 45, muscle: 'Triceps' }
    ]
  },
  {
    id: 'workout-2',
    name: 'Upper Body Blast',
    category: 'Strength',
    difficulty: 'Advanced',
    duration: 45,
    calories: 380,
    description: 'High-intensity hyper-focus on chest, back, shoulders, and arms to develop dense upper body strength.',
    exercises: [
      { name: 'Incline Dumbbell Press', sets: 4, reps: '10 reps', restSec: 60, muscle: 'Upper Chest' },
      { name: 'Weighted Pull-Ups / Lat Pulldown', sets: 4, reps: '8-10 reps', restSec: 60, muscle: 'Latissimus Dorsi' },
      { name: 'Seated Cable Row', sets: 3, reps: '12 reps', restSec: 45, muscle: 'Rhomboids, Mid Back' },
      { name: 'Dumbbell Lateral Raises', sets: 4, reps: '15 reps', restSec: 45, muscle: 'Lateral Deltoids' },
      { name: 'Dips (Chest Focus)', sets: 3, reps: '12 reps', restSec: 60, muscle: 'Chest, Triceps' },
      { name: 'Incline Bicep Curls', sets: 3, reps: '12 reps', restSec: 45, muscle: 'Biceps Brachii' }
    ]
  },
  {
    id: 'workout-3',
    name: 'Leg Day',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 50,
    calories: 410,
    description: 'Lower body foundation workout challenging quad strength, hamstring endurance, and calf power.',
    exercises: [
      { name: 'Goblet Squats', sets: 4, reps: '12 reps', restSec: 60, muscle: 'Quads & Glutes' },
      { name: 'Walking Dumbbell Lunges', sets: 3, reps: '20 steps', restSec: 60, muscle: 'Glutes, Stabilizers' },
      { name: 'Leg Press', sets: 4, reps: '12 reps', restSec: 60, muscle: 'Quadriceps' },
      { name: 'Lying Hamstring Curls', sets: 4, reps: '12 reps', restSec: 45, muscle: 'Hamstrings' },
      { name: 'Standing Calf Raises', sets: 4, reps: '20 reps', restSec: 45, muscle: 'Gastrocnemius' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '10 per leg', restSec: 60, muscle: 'Quads, Glute Medius' }
    ]
  },
  {
    id: 'workout-4',
    name: 'Morning Run',
    category: 'Cardio',
    difficulty: 'Beginner',
    duration: 30,
    calories: 280,
    description: 'Steady-state aerobic endurance session to ignite morning alertness and cardiovascular health.',
    exercises: [
      { name: 'Brisk Warm-up Walk & Drills', sets: 1, reps: '5 min', restSec: 0, muscle: 'Full Body' },
      { name: 'Zone 2 Baseline Jog', sets: 1, reps: '15 min', restSec: 60, muscle: 'Aerobic System' },
      { name: 'Tempo Strides', sets: 5, reps: '45 sec pace', restSec: 30, muscle: 'Cardiovascular' },
      { name: 'Cool Down Walk & Leg Swings', sets: 1, reps: '5 min', restSec: 0, muscle: 'Active Recovery' }
    ]
  },
  {
    id: 'workout-5',
    name: 'HIIT Burner',
    category: 'HIIT',
    difficulty: 'Advanced',
    duration: 35,
    calories: 460,
    description: 'Explosive interval circuits designed for maximum calorie burn and anaerobic threshold expansion.',
    exercises: [
      { name: 'Burpee Broad Jumps', sets: 4, reps: '40 sec on / 20 sec rest', restSec: 20, muscle: 'Full Body Explosive' },
      { name: 'Kettlebell Swings', sets: 4, reps: '45 sec on / 15 sec rest', restSec: 15, muscle: 'Posterior Chain' },
      { name: 'Mountain Climbers', sets: 4, reps: '45 sec on / 15 sec rest', restSec: 15, muscle: 'Core & Cardio' },
      { name: 'Box Jumps or Tuck Jumps', sets: 4, reps: '40 sec on / 20 sec rest', restSec: 20, muscle: 'Calves, Quads' },
      { name: 'Battle Ropes or Shadow Punches', sets: 4, reps: '45 sec on / 15 sec rest', restSec: 30, muscle: 'Shoulders, Core' }
    ]
  },
  {
    id: 'workout-6',
    name: 'Core Crusher',
    category: 'Full Body',
    difficulty: 'Intermediate',
    duration: 25,
    calories: 210,
    description: '360-degree midsection activation targeting rectus abdominis, obliques, and transverse stabilizer muscles.',
    exercises: [
      { name: 'Standard Plank Hold', sets: 3, reps: '60 sec', restSec: 30, muscle: 'Transverse Abdominis' },
      { name: 'Bicycle Crunches', sets: 3, reps: '24 reps', restSec: 30, muscle: 'Obliques' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12 reps', restSec: 45, muscle: 'Lower Abdominals' },
      { name: 'Russian Twists (Weighted)', sets: 3, reps: '30 reps', restSec: 30, muscle: 'Obliques' },
      { name: 'Ab Wheel Rollouts', sets: 3, reps: '10 reps', restSec: 45, muscle: 'Core Wall' }
    ]
  },
  {
    id: 'workout-7',
    name: 'Yoga Flow',
    category: 'Yoga',
    difficulty: 'Beginner',
    duration: 40,
    calories: 190,
    description: 'Fluid vinyasa sequence blending breath synchronization, joint decompression, and spinal posture alignment.',
    exercises: [
      { name: 'Sun Salutation A (Surya Namaskar)', sets: 5, reps: '5 rounds', restSec: 30, muscle: 'Full Body Spine' },
      { name: 'Warrior II to Reverse Warrior', sets: 3, reps: '5 breaths / side', restSec: 15, muscle: 'Hips, Quads' },
      { name: 'Extended Triangle Pose', sets: 2, reps: '6 breaths / side', restSec: 15, muscle: 'Hamstrings, Spine' },
      { name: 'Downward Dog to Pigeon Pose', sets: 2, reps: '8 breaths / side', restSec: 30, muscle: 'Hip Rotators' },
      { name: 'Bridge Pose to Savasana', sets: 1, reps: '7 min hold', restSec: 0, muscle: 'Lower Back Relaxation' }
    ]
  },
  {
    id: 'workout-8',
    name: 'Mobility Session',
    category: 'Mobility',
    difficulty: 'Beginner',
    duration: 30,
    calories: 150,
    description: 'Targeted myofascial release, hip capsule opening, thoracic rotation, and ankle dorsiflexion recovery.',
    exercises: [
      { name: '90/90 Hip Swivels', sets: 3, reps: '12 reps', restSec: 15, muscle: 'Hip Internal & External' },
      { name: "World's Greatest Stretch", sets: 3, reps: '6 reps / side', restSec: 20, muscle: 'Thoracic, Hip Flexor' },
      { name: 'Cat-Cow Spinal Undulations', sets: 3, reps: '15 cycles', restSec: 15, muscle: 'Spinal Column' },
      { name: 'Wall Ankle Mobilization', sets: 3, reps: '12 pulses / leg', restSec: 15, muscle: 'Ankle Dorsiflexion' },
      { name: 'Foam Roller Thoracic Extension', sets: 2, reps: '3 min roll', restSec: 0, muscle: 'Upper Back' }
    ]
  },
  {
    id: 'workout-9',
    name: 'Chest & Triceps',
    category: 'Strength',
    difficulty: 'Intermediate',
    duration: 45,
    calories: 370,
    description: 'Classic pushing powerhouse focusing on chest hypertrophy, serratus activation, and tricep lockouts.',
    exercises: [
      { name: 'Barbell Flat Bench Press', sets: 4, reps: '8-10 reps', restSec: 75, muscle: 'Pectoralis Major' },
      { name: 'Incline Dumbbell Flyes', sets: 3, reps: '12 reps', restSec: 60, muscle: 'Sternal Head' },
      { name: 'Bodyweight Push-Ups to Failure', sets: 3, reps: 'Max reps', restSec: 45, muscle: 'Chest & Core' },
      { name: 'Overhead EZ-Bar Tricep Extensions', sets: 3, reps: '12 reps', restSec: 45, muscle: 'Triceps Long Head' },
      { name: 'Cable Tricep Kickbacks', sets: 3, reps: '15 reps', restSec: 30, muscle: 'Triceps Lateral Head' }
    ]
  },
  {
    id: 'workout-10',
    name: 'Lower Body Strength',
    category: 'Strength',
    difficulty: 'Advanced',
    duration: 55,
    calories: 450,
    description: 'Heavy posterior and anterior chain development with deadlifts, squats, and unilateral balance.',
    exercises: [
      { name: 'Conventional Deadlift', sets: 4, reps: '6-8 reps', restSec: 90, muscle: 'Full Posterior Chain' },
      { name: 'Front Squats', sets: 4, reps: '8 reps', restSec: 75, muscle: 'Quads, Core Bracing' },
      { name: 'Barbell Hip Thrusts', sets: 4, reps: '12 reps', restSec: 60, muscle: 'Gluteus Maximus' },
      { name: 'Dumbbell Step-Ups', sets: 3, reps: '10 per leg', restSec: 45, muscle: 'Quadriceps, Balance' },
      { name: 'Seated Calf Press', sets: 4, reps: '15 reps', restSec: 45, muscle: 'Soleus, Calves' }
    ]
  }
];
