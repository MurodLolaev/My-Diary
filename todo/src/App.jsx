// import { useEffect, useState } from 'react'
// import { Toaster } from 'react-hot-toast'
// import { Plus, Sparkles } from 'lucide-react'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import TaskForm from './components/TaskForm'
// import Modal from './components/Modal'
// import DayGroup from './components/DayGroup'
// import { useThemeStore } from './store/useThemeStore'
// import { useTaskStore } from './store/useTaskStore'
// import { useLanguageStore } from './store/useLanguageStore'
// import { translations } from './locales/translations'
// import { useTaskReminders } from './hooks/useTaskReminders'
// import { groupTasksByDate } from './utils/dateHelpers'

// export default function App() {
//   const theme = useThemeStore((state) => state.theme)
//   const tasks = useTaskStore((state) => state.tasks)
//   const language = useLanguageStore((state) => state.language)
//   const t = translations[language]

//   const [filter, setFilter] = useState('active')
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const [highlightedTaskId, setHighlightedTaskId] = useState(null)

// const handleOverdueTaskClick = (task) => {
//   // если задача в данный момент во вкладке "завершённые", а не "активные" — переключим вкладку
//   setFilter(task.completed ? 'completed' : 'active')
//   setHighlightedTaskId(task.id)
//   // снимаем подсветку через пару секунд
//   setTimeout(() => setHighlightedTaskId(null), 2500)
// }

//   useTaskReminders()

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', theme === 'dark')
//   }, [theme])

//   const filteredTasks = tasks.filter((task) =>
//     filter === 'active' ? !task.completed : task.completed
//   )

//   const groupedTasks = groupTasksByDate(filteredTasks)

//   return (
//     <div className="min-h-screen flex flex-col relative overflow-hidden animated-gradient-bg transition-colors">
//       {/* декоративные плавающие пятна */}
//       <div className="blob w-96 h-96 bg-indigo-400 dark:bg-indigo-600 top-[-100px] left-[-100px]" />
//       <div className="blob w-96 h-96 bg-cyan-300 dark:bg-cyan-700 top-[300px] right-[-150px]" style={{ animationDelay: '4s' }} />
//       <div className="blob w-72 h-72 bg-purple-300 dark:bg-purple-700 bottom-[-100px] left-[30%]" style={{ animationDelay: '8s' }} />

//       <Toaster position="top-right" />
//       <Header />
// <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
//   {/* Hero заголовок */}
//   <div className="text-center mb-10 fade-in-up">
//     <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full glass bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10">
//       <Sparkles size={16} className="text-indigo-500 dark:text-cyan-400" />
//       <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.diary.subtitle}</span>
//     </div>
//     <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-300">
//       {t.diary.title}
//     </h1>
//   </div>

//   {/* Общая рамка-контейнер вокруг панели управления + списка задач */}
//   <div className="glass bg-white/30 dark:bg-white/[0.03] border-2 border-white/50 dark:border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl shadow-indigo-200/40 dark:shadow-black/30">
//     {/* Панель управления: вкладки + кнопка добавления */}
//     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 glass bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-2xl px-5 py-4 shadow-md">
//       <div className="flex gap-2">
//         <button
//           onClick={() => setFilter('active')}
//           className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
//             filter === 'active'
//               ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-300/50 scale-105'
//               : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10'
//           }`}
//         >
//           {t.tasks.active} ({tasks.filter((task) => !task.completed).length})
//         </button>
//         <button
//           onClick={() => setFilter('completed')}
//           className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
//             filter === 'completed'
//               ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-300/50 scale-105'
//               : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10'
//           }`}
//         >
//           {t.tasks.completed} ({tasks.filter((task) => task.completed).length})
//         </button>
//       </div>

//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-300/50"
//       >
//         <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] group-hover:bg-[position:100%_0] transition-[background-position] duration-500" />
//         <Plus size={18} className="relative z-10" />
//         <span className="relative z-10">{t.form.addButton}</span>
//       </button>
//     </div>

//     {groupedTasks.length === 0 && (
//       <div className="text-center py-16 glass bg-white/40 dark:bg-white/5 rounded-2xl border border-white/30 dark:border-white/10">
//         <p className="text-gray-500 dark:text-gray-400">
//           {filter === 'active' ? t.tasks.noActive : t.tasks.noCompleted}
//         </p>
//       </div>
//     )}

//     <div className="space-y-6">
//       {groupedTasks.map((group) => (
//         <DayGroup key={group.date} date={group.date} tasks={group.tasks} />
//       ))}
//     </div>
//   </div>
// </main>

//       <Footer />

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.form.modalTitle}>
//         <TaskForm onSuccess={() => setIsModalOpen(false)} />
//       </Modal>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Plus, Sparkles } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import TaskForm from './components/TaskForm'
import Modal from './components/Modal'
import DayGroup from './components/DayGroup'
import { useThemeStore } from './store/useThemeStore'
import { useTaskStore } from './store/useTaskStore'
import { useLanguageStore } from './store/useLanguageStore'
import { translations } from './locales/translations'
import { useTaskReminders } from './hooks/useTaskReminders'
import { groupTasksByDate } from './utils/dateHelpers'

export default function App() {
  const theme = useThemeStore((state) => state.theme)
  const tasks = useTaskStore((state) => state.tasks)
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]

  const [filter, setFilter] = useState('active')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [highlightedTaskId, setHighlightedTaskId] = useState(null)

  const handleOverdueTaskClick = (task) => {
    // если задача в данный момент во вкладке "завершённые", а не "активные" — переключим вкладку
    setFilter(task.completed ? 'completed' : 'active')
    setHighlightedTaskId(task.id)
    // снимаем подсветку через пару секунд
    setTimeout(() => setHighlightedTaskId(null), 2500)
  }

  useTaskReminders()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const filteredTasks = tasks.filter((task) =>
    filter === 'active' ? !task.completed : task.completed
  )

  const groupedTasks = groupTasksByDate(filteredTasks)

  return (
    <div className="min-h-screen flex flex-col relative animated-gradient-bg transition-colors">
      {/* декоративные плавающие пятна */}
      <div className="blob w-96 h-96 bg-indigo-400 dark:bg-indigo-600 top-[-100px] left-[-100px]" />
      <div className="blob w-96 h-96 bg-cyan-300 dark:bg-cyan-700 top-[300px] right-[-150px]" style={{ animationDelay: '4s' }} />
      <div className="blob w-72 h-72 bg-purple-300 dark:bg-purple-700 bottom-[-100px] left-[30%]" style={{ animationDelay: '8s' }} />

      <Toaster position="top-right" />
      <Header onOverdueTaskClick={handleOverdueTaskClick} />
      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {/* Hero заголовок */}
        <div className="text-center mb-10 fade-in-up">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full glass bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10">
            <Sparkles size={16} className="text-indigo-500 dark:text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-300">
            {t.diary.subtitle}
          </h1>
      </div>

        {/* Общая рамка-контейнер вокруг панели управления + списка задач */}
        <div className="glass bg-white/30 dark:bg-white/[0.03] border-2 border-white/50 dark:border-white/10 rounded-3xl p-4 sm:p-6 shadow-xl shadow-indigo-200/40 dark:shadow-black/30">
          {/* Панель управления: вкладки + кнопка добавления */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 glass bg-white/50 dark:bg-white/5 border border-white/40 dark:border-white/10 rounded-2xl px-5 py-4 shadow-md">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('active')}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === 'active'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-300/50 scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {t.tasks.active} ({tasks.filter((task) => !task.completed).length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === 'completed'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-300/50 scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {t.tasks.completed} ({tasks.filter((task) => task.completed).length})
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-300/50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] group-hover:bg-[position:100%_0] transition-[background-position] duration-500" />
              <Plus size={18} className="relative z-10" />
              <span className="relative z-10">{t.form.addButton}</span>
            </button>
          </div>

          {groupedTasks.length === 0 && (
            <div className="text-center py-16 glass bg-white/40 dark:bg-white/5 rounded-2xl border border-white/30 dark:border-white/10">
              <p className="text-gray-500 dark:text-gray-400">
                {filter === 'active' ? t.tasks.noActive : t.tasks.noCompleted}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {groupedTasks.map((group) => (
              <DayGroup
                key={group.date}
                date={group.date}
                tasks={group.tasks}
                highlightedTaskId={highlightedTaskId}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.form.modalTitle}>
        <TaskForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}