import { useState, useRef, useEffect } from 'react'
import { Bell, AlertTriangle } from 'lucide-react'
import { useOverdueTasks } from '../hooks/useOverdueTasks'
import { useLanguageStore } from '../store/useLanguageStore'
import { translations } from '../locales/translations'
import { formatDateReadable } from '../utils/dateHelpers'

const LOCALE_MAP = { ru: 'ru-RU', tj: 'tg-TJ', en: 'en-US' }

export default function NotificationBell({ onTaskClick }) {
  const overdueTasks = useOverdueTasks()
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]
  const locale = LOCALE_MAP[language] || 'ru-RU'

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // закрытие дропдауна при клике вне него
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const count = overdueTasks.length

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-200"
      >
        <Bell size={20} className={count > 0 ? 'animate-[wiggle_0.5s_ease-in-out]' : ''} />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-md animate-pulse">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-2xl glass bg-white/90 dark:bg-gray-800/90 border border-white/40 dark:border-white/10 shadow-2xl z-50 fade-in-up">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              {t.notifications.overdueTitle} ({count})
            </span>
          </div>

          {count === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {t.notifications.noOverdue}
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {overdueTasks.map((task) => (
                <li
                  key={task.id}
                  onClick={() => {
                    setIsOpen(false)
                    if (onTaskClick) onTaskClick(task)
                  }}
                  className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{task.title}</p>
                  <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                    {formatDateReadable(task.date, locale)} · {t.notifications.wasUntil} {task.endTime}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}