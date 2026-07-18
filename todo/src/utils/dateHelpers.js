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

// Ручной словарь дней недели — не полагаемся на браузер для tj
const WEEKDAY_NAMES = {
  ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  tj: ['Якшанбе', 'Душанбе', 'Сешанбе', 'Чоршанбе', 'Панҷшанбе', 'Ҷумъа', 'Шанбе'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
}

export function getDayName(dateString, language = 'ru') {
  const dayIndex = getDayOfWeek(dateString)
  const names = WEEKDAY_NAMES[language] || WEEKDAY_NAMES.ru
  return names[dayIndex]
}

// Ручное форматирование даты — тоже не полагаемся на браузер для tj
const MONTH_NAMES = {
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  tj: ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентябр', 'октябр', 'ноябр', 'декабр'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

export function formatDateReadable(dateString, language = 'ru') {
  const [year, month, day] = dateString.split('-').map(Number)
  const names = MONTH_NAMES[language] || MONTH_NAMES.ru
  return `${day} ${names[month - 1]} ${year}`
}

// Проверяет, истекло ли время окончания задачи
export function isOverdue(task) {
  if (task.completed) return false
  const [year, month, day] = task.date.split('-').map(Number)
  const [endHours, endMinutes] = task.endTime.split(':').map(Number)
  const taskEndDateTime = new Date(year, month - 1, day, endHours, endMinutes)
  return new Date() > taskEndDateTime
}

// Группировка задач по дате
export function groupTasksByDate(tasks) {
  const groups = {}
  tasks.forEach((task) => {
    if (!groups[task.date]) groups[task.date] = []
    groups[task.date].push(task)
  })
  Object.values(groups).forEach((dayTasks) => {
    dayTasks.sort((a, b) => a.startTime.localeCompare(b.startTime))
  })
  return Object.entries(groups)
    .map(([date, dayTasks]) => ({ date, tasks: dayTasks }))
    .sort((a, b) => a.date.localeCompare(b.date))
}