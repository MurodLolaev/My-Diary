import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { Pencil, Check, RotateCcw, Trash2, Save, X, AlertTriangle } from 'lucide-react'
import { useTaskStore } from '../store/useTaskStore'
import { useLanguageStore } from '../store/useLanguageStore'
import { translations } from '../locales/translations'
import { isOverdue } from '../utils/dateHelpers'

export default function TaskItem({ task, highlight }) {
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const removeTask = useTaskStore((state) => state.removeTask)
  const editTask = useTaskStore((state) => state.editTask)
  const language = useLanguageStore((state) => state.language)
  const t = translations[language]

  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [date, setDate] = useState(task.date)
  const [startTime, setStartTime] = useState(task.startTime)
  const [endTime, setEndTime] = useState(task.endTime)

  const itemRef = useRef(null)
  const overdue = isOverdue(task)

  // при клике из уведомлений — плавно скроллим к этой задаче
  useEffect(() => {
    if (highlight && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [highlight])

  const handleSave = () => {
    if (!title || !date || !startTime || !endTime) {
      toast.error(t.form.fillAllFields)
      return
    }
    editTask(task.id, { title, date, startTime, endTime })
    toast.success(t.tasks.updated)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(task.title)
    setDate(task.date)
    setStartTime(task.startTime)
    setEndTime(task.endTime)
    setIsEditing(false)
  }

  const handleDeleteClick = () => {
    if (confirmDelete) {
      removeTask(task.id)
      toast.success(t.tasks.deleted)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  if (isEditing) {
    return (
      <div className="px-5 py-4 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md text-sm"
          >
            <Save size={16} /> {t.form.save}
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1 bg-gray-400 text-white rounded-md text-sm"
          >
            <X size={16} /> {t.form.cancel}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={itemRef}
      className={`px-5 py-4 flex items-center justify-between transition-all duration-500 ${
        highlight
          ? 'bg-red-100 dark:bg-red-900/30 ring-2 ring-red-400 ring-inset'
          : overdue
          ? 'bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'hover:bg-white/50 dark:hover:bg-white/5'
      }`}
    >
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
          {task.title}
          {task.completed && <Check size={16} className="text-green-500" />}
          {overdue && !task.completed && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-red-500 text-white rounded-full">
              <AlertTriangle size={12} /> {t.tasks.overdue}
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {task.startTime} — {task.endTime}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          title={t.tasks.edit}
          className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => {
            toggleTask(task.id)
            toast.success(task.completed ? t.tasks.returned : t.tasks.completedToast)
          }}
          title={task.completed ? t.tasks.returnToWork : t.tasks.complete}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {task.completed ? <RotateCcw size={16} /> : <Check size={16} />}
        </button>
        <button
          onClick={handleDeleteClick}
          title={confirmDelete ? t.tasks.confirmDelete : t.tasks.delete}
          className={`p-2 rounded-md text-white transition-colors ${
            confirmDelete ? 'bg-red-700 animate-pulse' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}