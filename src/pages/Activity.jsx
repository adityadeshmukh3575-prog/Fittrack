import React, { useState, useMemo } from 'react';
import { useFitness } from '../context/FitnessContext.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatFriendlyDate } from '../utils/calculations.js';
import {
  Search,
  Filter,
  ArrowUpDown,
  Trash2,
  Clock,
  Flame,
  CheckCircle2,
  Calendar,
  Info,
  Plus
} from 'lucide-react';

const TYPES = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Mobility', 'Full Body'];
const DATE_RANGES = [
  { label: 'All Time', value: 'all' },
  { label: 'Past 7 Days', value: '7d' },
  { label: 'Past 30 Days', value: '30d' }
];

export default function Activity() {
  const { history, deleteHistoryItem, setSelectedWorkoutDetails, setOpenManualLogModal } = useFitness();

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'longest' | 'calories'

  const filteredHistory = useMemo(() => {
    let result = [...history];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.type && item.type.toLowerCase().includes(q)) ||
          (item.notes && item.notes.toLowerCase().includes(q))
      );
    }

    // Type filter
    if (selectedType !== 'All') {
      result = result.filter((item) => item.type && item.type.toLowerCase() === selectedType.toLowerCase());
    }

    // Date range filter
    if (selectedDateRange !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      if (selectedDateRange === '7d') cutoff.setDate(now.getDate() - 7);
      if (selectedDateRange === '30d') cutoff.setDate(now.getDate() - 30);

      result = result.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= cutoff;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'longest') return (Number(b.duration) || 0) - (Number(a.duration) || 0);
      if (sortBy === 'calories') return (Number(b.calories) || 0) - (Number(a.calories) || 0);
      return 0;
    });

    return result;
  }, [history, search, selectedType, selectedDateRange, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Quick Log */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Activity History
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Comprehensive audit log of all completed and recorded workouts ({history.length} total)
          </p>
        </div>

        <button
          onClick={() => setOpenManualLogModal(true)}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="w-4 h-4" />
          <span>Log Workout</span>
        </button>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search activity by workout name or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Workout Type Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Date Range:</span>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {DATE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="longest">Longest Duration</option>
              <option value="calories">Highest Calories</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Table & Responsive List */}
      {filteredHistory.length === 0 ? (
        <EmptyState
          title="No activity records match your criteria"
          description="Adjust your search query or reset the date and category filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setSelectedType('All');
            setSelectedDateRange('all');
            setSortBy('newest');
          }}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Workout</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right">Duration</th>
                  <th className="py-3 px-4 text-right">Calories</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                      {formatFriendlyDate(item.date)}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <div>
                        <span>{item.name}</span>
                        {item.notes && (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal line-clamp-1 mt-0.5">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {item.type}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                      {item.duration} min
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-amber-500 tabular-nums">
                      {item.calories} kcal
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.status || 'Completed'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedWorkoutDetails(item)}
                          title="View Details"
                          aria-label={`View details for ${item.name}`}
                          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          title="Delete from history"
                          aria-label={`Delete ${item.name}`}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filteredHistory.map((item) => (
              <div key={item.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.type}</span>
                  <span className="tabular-nums">{formatFriendlyDate(item.date)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {item.status || 'Completed'}
                  </span>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.notes}</p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                      {item.duration} min
                    </span>
                    <span className="font-semibold text-amber-500 tabular-nums">
                      {item.calories} kcal
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedWorkoutDetails(item)}
                      className="p-1 text-slate-500 hover:text-slate-900"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteHistoryItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
