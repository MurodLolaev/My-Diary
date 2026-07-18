import { useLanguageStore } from '../store/useLanguageStore'
import { translations } from '../locales/translations'

export default function Footer() {
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]

  return (
    <footer className="relative z-10 glass bg-white/60 dark:bg-gray-900/50 border-t border-white/40 dark:border-white/10 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {t.footer.copyright}
      </div>
    </footer>
  )
}