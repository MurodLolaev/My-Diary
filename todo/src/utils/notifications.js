export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.warn('Браузер не поддерживает уведомления')
    return
  }

  if (Notification.permission === 'default') {
    Notification.requestPermission()
  }
}

export function showNotification(title, options = {}) {
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  new Notification(title, options)
}