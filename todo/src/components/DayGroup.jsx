import TaskItem from './TaskItem'
import { getDayName, formatDateReadable, isWeekend } from '../utils/dateHelpers'
import { useLanguageStore } from '../store/useLanguageStore'
import { translations } from '../locales/translations'

export default function DayGroup({ date, tasks, highlightedTaskId }) {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]
  const weekend = isWeekend(date)

  return (
    <div className="fade-in-up rounded-2xl overflow-hidden glass bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-md">
      <div
        className={`flex items-center gap-3 px-5 py-3 ${
          weekend
            ? 'bg-gradient-to-r from-orange-400/80 to-amber-400/80 dark:from-orange-600/40 dark:to-amber-600/40'
            : 'bg-gradient-to-r from-indigo-500/90 to-purple-500/90 dark:from-indigo-700/50 dark:to-purple-700/50'
        }`}
      >
        <span className="font-bold text-white">{formatDateReadable(date, language)}</span>
        <span className="text-sm text-white/80 capitalize">{getDayName(date, language)}</span>
        {weekend && (
          <span className="ml-auto text-xs px-3 py-1 bg-white/25 text-white rounded-full font-medium">
            {t.tasks.weekend}
          </span>
        )}
      </div>

      <div className="divide-y divide-gray-200/60 dark:divide-white/10">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} highlight={task.id === highlightedTaskId} />
        ))}
      </div>
    </div>
  )
}