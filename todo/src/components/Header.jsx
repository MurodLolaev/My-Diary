

import { useThemeStore } from '../store/useThemeStore'
import { useLanguageStore } from '../store/useLanguageStore'
import { translations } from '../locales/translations'
import NotificationBell from './NotificationBell'

export default function Header({ onOverdueTaskClick }) {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const t = translations[language]

  return (
    <header className="sticky top-0 z-50 glass bg-white/70 dark:bg-gray-900/60 border-b border-white/40 dark:border-white/10 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
       <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {t.diary.title}
        </h1>

        <nav className="flex items-center gap-3">
          <NotificationBell onTaskClick={onOverdueTaskClick} />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          >
            <option value="ru">Русский</option>
            <option value="tj">Тоҷикӣ</option>
            <option value="en">English</option>
          </select>

          <button
            onClick={toggleTheme}
            className="px-4 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-lg hover:shadow-indigo-300/50 dark:hover:shadow-indigo-900/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {theme === 'light' ? t.header.theme.toDark : t.header.theme.toLight}
          </button>
        </nav>
      </div>
    </header>
  )
}