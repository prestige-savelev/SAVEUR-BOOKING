export interface TimeSlotOptions {
  startHour: number
  endHour: number
  stepMinutes: number
}

export function getTimeSlots(options: TimeSlotOptions): string[] {
  const { startHour, endHour, stepMinutes } = options

  const slots: string[] = []
  const totalMinutesEnd = endHour * 60

  for (let minutes = startHour * 60; minutes <= totalMinutesEnd; minutes += stepMinutes) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
  }

  return slots
}