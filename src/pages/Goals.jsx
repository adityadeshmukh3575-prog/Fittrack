import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext.jsx';
import GoalCard from '../components/GoalCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { Plus, Target, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function Goals() {
  const { goals, deleteGoal, setOpenAddGoalModal, setGoalToUpdate } = useFitness();
  const [filterStatus, setFilterStatus] = useState('All'); // 'All' | 'In Progress' | 'Completed' | 'Overdue'

  const filteredGoals = goals.filter((g) => {
    const isCompleted = g.status === 'Completed' || g.current >= g.target;
    const isOverdue = !isCompleted && g.deadline && new Date(g.deadline) < new Date(new Date().setHours(0,0,0,0));

    if (filterStatus === 'All') return true;
    if (filterStatus === 'Completed') return isCompleted;
    if (filterStatus === 'Overdue') return isOverdue;
    if (filterStatus === 'In Progress') return !isCompleted && !isOverdue;
    return true;
  });

  const totalGoals = goals.length;
  const completedCount = goals.filter((g) => g.status === 'Completed' || g.current >= g.target).length;
  const inProgressCount = goals.filter((g) => g.status !== 'Completed' && g.current < g.target).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & New Goal Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Fitness Goals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Set ambitious targets, track milestones, and conquer your personal objectives
          </p>
        </div>

        <button
          onClick={() => setOpenAddGoalModal(true)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Goals</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{inProgressCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Completed Milestones</span>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5">{completedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Tracked</span>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{totalGoals}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start w-fit text-xs">
        {['All', 'In Progress', 'Completed', 'Overdue'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ${
              filterStatus === tab
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      {filteredGoals.length === 0 ? (
        <EmptyState
          title="No goals found"
          description={
            filterStatus === 'All'
              ? 'No goals yet. Create your first fitness goal to establish milestones!'
              : `No goals matching the "${filterStatus}" filter.`
          }
          actionLabel="Add New Goal"
          onAction={() => setOpenAddGoalModal(true)}
          icon={Target}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdate={(g) => setGoalToUpdate(g)}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
