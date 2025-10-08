export function requestPermission() {
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  } catch {}
}

function atTimeToday(timeStr) {
  const [hh, mm] = (timeStr || '09:00').split(':');
  const d = new Date();
  d.setHours(parseInt(hh || 9,10), parseInt(mm || 0,10), 0, 0);
  return d;
}

export function scheduleReminder(item) {
  try {
    requestPermission();
    const now = new Date();
    const start = item.remindFrom ? new Date(item.remindFrom) : now;
    const notifyAt = atTimeToday(item.notifyTime || '09:00');
    // schedule today or tomorrow
    let firstFire = new Date(start);
    firstFire.setHours(notifyAt.getHours(), notifyAt.getMinutes(), 0, 0);
    if (firstFire < now) {
      // schedule next day
      firstFire.setDate(firstFire.getDate() + 1);
    }
    const delay = Math.max(0, firstFire.getTime() - now.getTime());
    setTimeout(() => {
      try {
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted' && (item.notifyType === 'pwa' || item.notifyType === 'both')) {
          new Notification(item.name || 'Reminder', { body: `Verloopt op ${item.expiryDate || ''}` });
        }
        // Email path would go here if enabled serverless
      } catch {}
    }, delay);
  } catch {}
}
