const DAYS_RU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getDayOfWeek(dateString) {
  return parseLocalDate(dateString).getDay()
}

export function isWeekend(dateString) {
  const day = getDayOfWeek(dateString)
  return day === 0 || day === 6
}

export function getDayName(dateString, locale = 'ru') {
  return parseLocalDate(dateString).toLocaleDateString(locale, { weekday: 'long' })
}

export function formatDateReadable(dateString, locale = 'ru') {
  return parseLocalDate(dateString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Группирует задачи по дате и сортирует внутри каждого дня по времени начала
export function groupTasksByDate(tasks) {
  const groups = {}

  tasks.forEach((task) => {
    if (!groups[task.date]) {
      groups[task.date] = []
    }
    groups[task.date].push(task)
  })

  // сортируем задачи внутри дня по времени начала
  Object.values(groups).forEach((dayTasks) => {
    dayTasks.sort((a, b) => a.startTime.localeCompare(b.startTime))
  })

  // возвращаем массив [{ date, tasks }], отсортированный по дате
  return Object.entries(groups)
    .map(([date, dayTasks]) => ({ date, tasks: dayTasks }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Проверяет, истекло ли время окончания задачи, и она не завершена
export function isOverdue(task) {
  if (task.completed) return false

  const [year, month, day] = task.date.split('-').map(Number)
  const [endHours, endMinutes] = task.endTime.split(':').map(Number)

  const taskEndDateTime = new Date(year, month - 1, day, endHours, endMinutes)
  const now = new Date()

  return now > taskEndDateTime
}