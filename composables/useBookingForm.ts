import type { BookingField, BookingFormData, BookingFormErrors, BookingStatus } from "~/types/booking";

// Слоты на запись в дальнейшем можно перекинуть на бек
const TimeSlots = { startHour: 12, endHour: 22, stepMinutes: 60 }
const guestOptions = { min: 1, max: 12, step: 1 }

export function useBookingForm() {

    const touched = reactive<Partial<Record<BookingField, boolean>>>({}) // Выбронное поле
    const status = ref<BookingStatus>('idle') // Статус формы
    const errors = reactive<BookingFormErrors>({}) // 
    const timeSlots = getTimeSlots(TimeSlots)
    const guests = guestOptions
    const minDate = todayISO()
    const maxDate = maxDateISO()
    const isSubmitting = computed(() => status.value === 'loading')

    const form = reactive<BookingFormData>({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 1
    })

    // Валидация полей формы
    function validateField(field: BookingField): string | null {
        switch (field) {
            case 'name': return validateName(form.name)
            case 'phone': return validatePhone(form.phone)
            case 'date': return validateDate(form.date)
            case 'time': return validateTime(form.time, timeSlots)
            case 'guests': return validateGuests(Number(form.guests))
            default: return null
        }
    }

    // Обработка ошибки при потери фокуса
    function handleBlur(field: BookingField) {
        touched[field] = true
        const message = validateField(field)
        if (message) {
            errors[field] = message
        } else {
            delete errors[field]
        }
    }

    // Валидация перед отправкой
    function validate(): boolean {
        const fields: BookingField[] = ['name', 'phone', 'date', 'time', 'guests']
        let isValid = true

        for (const field of fields) {
            touched[field] = true
            const message = validateField(field)
            if (message) {
                errors[field] = message
                isValid = false
            } else {
                delete errors[field]
            }
        }

        return isValid
    }

    // Отправка формы
    async function submit(): Promise<void> {
        if (!validate()) return

        status.value = 'loading'
        await new Promise((resolve) => setTimeout(resolve, 1500))
        status.value = 'success'
    }
    
    // Сброс формы
    function reset() {
        form.name = ''
        form.phone = ''
        form.date = ''
        form.time = ''
        form.guests = 1
        Object.keys(errors).forEach((key) => delete errors[key as BookingField])
        Object.keys(touched).forEach((key) => delete touched[key as BookingField])
        status.value = 'idle'
    }

  return {form, handleBlur, errors, minDate, maxDate, timeSlots, guests, isSubmitting, submit, status}
}


