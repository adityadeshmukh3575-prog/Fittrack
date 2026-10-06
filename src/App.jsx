import React from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import MobileNav from './components/MobileNav.jsx';
import Header from './components/Header.jsx';
import Toast from './components/Toast.jsx';

// Modals
import StartWorkoutModal from './components/StartWorkoutModal.jsx';
import LogWorkoutModal from './components/LogWorkoutModal.jsx';
import AddGoalModal from './components/AddGoalModal.jsx';
import UpdateGoalModal from './components/UpdateGoalModal.jsx';
import WorkoutDetailsModal from './components/WorkoutDetailsModal.jsx';

// Pages
import Dashboard from './pages/Dashboard.jsx';
import Workouts from './pages/Workouts.jsx';
import Goals from './pages/Goals.jsx';
import Progress from './pages/Progress.jsx';
import Activity from './pages/Activity.jsx';
import Settings from './pages/Settings.jsx';

function AppContent() {
  const {
    activeTab,
    setActiveTab,
    currentStreak,
    userProfile,
    theme,
    toggleTheme,
    // Modals
    activeWorkoutSession,
    finishActiveWorkout,
    cancelWorkoutSession,
    startWorkout,
    openManualLogModal,
    setOpenManualLogModal,
    logManualWorkout,
    openAddGoalModal,
    setOpenAddGoalModal,
    addGoal,
    goalToUpdate,
    setGoalToUpdate,
    updateGoalProgress,
    selectedWorkoutDetails,
    setSelectedWorkoutDetails,
    // Toast
    toast
  } = useFitness();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'workouts':
        return <Workouts />;
      case 'goals':
        return <Goals />;
      case 'progress':
        return <Progress />;
      case 'activity':
        return <Activity />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Desktop Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentStreak={currentStreak}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenLogModal={() => setOpenManualLogModal(true)}
        userName={userProfile.name}
      />

      {/* Main Viewport Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          userName={userProfile.name}
          currentStreak={currentStreak}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenLogModal={() => setOpenManualLogModal(true)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Modals */}
      {/* 1. Interactive Workout Player Modal */}
      {activeWorkoutSession && (
        <StartWorkoutModal
          session={activeWorkoutSession}
          onFinish={finishActiveWorkout}
          onCancel={cancelWorkoutSession}
        />
      )}

      {/* 2. Manual Log Workout Modal */}
      <LogWorkoutModal
        isOpen={openManualLogModal}
        onClose={() => setOpenManualLogModal(false)}
        onSave={logManualWorkout}
      />

      {/* 3. Add Goal Modal */}
      <AddGoalModal
        isOpen={openAddGoalModal}
        onClose={() => setOpenAddGoalModal(false)}
        onAdd={addGoal}
      />

      {/* 4. Update Goal Modal */}
      <UpdateGoalModal
        goal={goalToUpdate}
        isOpen={Boolean(goalToUpdate)}
        onClose={() => setGoalToUpdate(null)}
        onUpdate={updateGoalProgress}
      />

      {/* 5. Workout Details Modal */}
      <WorkoutDetailsModal
        workout={selectedWorkoutDetails}
        isOpen={Boolean(selectedWorkoutDetails)}
        onClose={() => setSelectedWorkoutDetails(null)}
        onStart={(w) => {
          setSelectedWorkoutDetails(null);
          startWorkout(w);
        }}
      />

      {/* 6. In-App Feedback Toast */}
      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <FitnessProvider>
      <AppContent />
    </FitnessProvider>
  );
}
