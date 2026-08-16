const NAME_REGEX = /^[A-Za-zА-Яа-яЁё\s-]+$/ // Валидация по буквам пробелам и дефис
const MAX_DAYS = 90 

// Даты
function toLocalISODate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayISO(): string {
  return toLocalISODate(new Date())
}

export function maxDateISO(): string {
  const max = new Date()
  max.setDate(max.getDate() + MAX_DAYS)
  return toLocalISODate(max)
}

// Валидация имени
export function validateName(value: string): string | null {
    const trimmed = value.trim()
    if (!trimmed) return 'Введите имя гостя'
    if (trimmed.length < 2) return 'Имя должно содержать минимум 2 символа'
    if (!NAME_REGEX.test(trimmed)) return 'Допустимы только буквы, пробелы и дефис'
    return null
}

// Нормализация телефона перед валидацией
export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, '')
}

// Валидация телефона
export function validatePhone(value: string): string | null {
  if (!value.trim()) return 'Введите номер телефона'
  const digits = normalizePhoneDigits(value)
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null
  }
  return 'Введите корректный номер: +7 или 8, 10 цифр'
}

// Валидация даты
export function validateDate(value: string): string | null {
  if (!value) return 'Выберите дату'
  const min = todayISO()
  const max = maxDateISO()
  if (value < min) return 'Дата не может быть раньше сегодняшней'
  if (value > max) return `Дата не может быть позднее чем через ${MAX_DAYS} дней`
  return null
}

// Валидация времени на слоты
export function validateTime(value: string, slots: string[]): string | null {
  if (!value) return 'Выберите время'
  if (!slots.includes(value)) return 'Выберите время из доступных слотов'
  return null
}

// Валидация времени гостей
export function validateGuests(value: number): string | null {
  if (value === null || value === undefined || Number.isNaN(value)) return 'Укажите количество гостей'
  if (!Number.isInteger(value)) return 'Количество гостей должно быть целым числом'
  if (value < 1 || value > 12) return 'От 1 до 12 гостей'
  return null
}