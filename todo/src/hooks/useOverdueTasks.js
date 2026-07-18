import { useState, useEffect } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import { isOverdue } from '../utils/dateHelpers'

export function useOverdueTasks() {
  const tasks = useTaskStore((state) => state.tasks)
  const [, forceTick] = useState(0)

  useEffect(() => {
    // раз в минуту пересчитываем — вдруг какая-то задача только что стала просроченной
    const interval = setInterval(() => forceTick((n) => n + 1), 60000)
    return () => clearInterval(interval)
  }, [])

  const overdueTasks = tasks.filter(isOverdue)

  return overdueTasks
}