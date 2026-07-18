import { useEffect, useRef } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import { showNotification } from '../utils/notifications'

export function useTaskReminders() {
  const tasks = useTaskStore((state) => state.tasks)
  const notifiedIds = useRef(new Set()) // чтобы не уведомлять о той же задаче дважды за сессию

  useEffect(() => {
    const checkTasks = () => {
      const now = new Date()
      const todayStr = now.toISOString().split('T')[0] // 'YYYY-MM-DD' в UTC — заменим ниже
      const currentHours = now.getHours().toString().padStart(2, '0')
      const currentMinutes = now.getMinutes().toString().padStart(2, '0')
      const currentTime = `${currentHours}:${currentMinutes}`

      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const day = now.getDate().toString().padStart(2, '0')
      const localToday = `${year}-${month}-${day}`

      tasks.forEach((task) => {
        if (
          !task.completed &&
          task.date === localToday &&
          task.startTime === currentTime &&
          !notifiedIds.current.has(task.id)
        ) {
          showNotification('⏰ Время задачи!', {
            body: task.title,
          })
          notifiedIds.current.add(task.id)
        }
      })
    }

    const intervalId = setInterval(checkTasks, 30000) // проверка каждые 30 секунд
    checkTasks() // и сразу при монтировании

    return () => clearInterval(intervalId)
  }, [tasks])
}