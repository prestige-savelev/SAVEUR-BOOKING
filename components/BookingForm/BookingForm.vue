<script setup lang="ts">
    import type { BookingFormData } from '~/types/booking';
    import BaseInput from '../ui/BaseInput/BaseInput.vue';
    import BaseSelect from '../ui/BaseSelect/BaseSelect.vue';
    import BaseButton from '../ui/BaseButton/BaseButton.vue';

    const emit = defineEmits<{
    (e: 'success', data: BookingFormData): void
    }>()

    const { form, handleBlur, errors, minDate, maxDate, timeSlots, guests, isSubmitting, submit, status } = useBookingForm()

    // Обработчик отправки формы
    async function handleSubmit() {
        await submit()
        if (status.value === 'success') {
            emit('success', { ...form })
        }
    }

</script>

<template>
    <form 
        :class="$style.card"
        novalidate
        @submit.prevent="handleSubmit"
    >
        <h1 :class="$style.title">Бронирование столика</h1>
        <p :class="$style.subtitle">Заполните форму, и мы подтвердим бронь в течение 5 минут</p>

        <div :class="$style.form">

            <!-- {Блок имени} -->
            <BaseInput
                id="name"
                v-model="form.name"
                label="Имя гостя"
                placeholder="Иван Иванов"
                :error="errors.name"
                @blur="handleBlur('name')"
            />

            <!-- {Блок телефона} -->
             <!-- Тут лучше маску добавить, но по условию надо +7 и 8, поэтому не стал -->
            <BaseInput
                id="phone"
                v-model="form.phone"
                type="tel"
                label="Номер телефона"
                placeholder="+7 (999) 999-99-99"
                :error="errors.phone"
                @blur="handleBlur('phone')"
            />

            <div :class="$style.row">

                <!-- {Блок даты} -->
                <BaseInput
                    id="date"
                    v-model="form.date"
                    type="date"
                    label="Дата"
                    :min="minDate"
                    :max="maxDate"
                    :error="errors.date"
                    @blur="handleBlur('date')"
                />

                <!-- {Блок времени} -->
                <BaseSelect
                    id="time"
                    v-model="form.time"
                    label="Время"
                    placeholder="Выберите время"
                    :options="timeSlots"
                    :error="errors.time"
                    @blur="handleBlur('time')"
                />

            </div>

            <!-- {Блок гостей} -->
            <BaseInput
                id="guests"
                v-model.number="form.guests"
                type="number"
                label="Количество гостей"
                :min="guests.min"
                :max="guests.max"
                :step="guests.step"
                :error="errors.guests"
                @blur="handleBlur('guests')"
            />

            <!-- Кнопка отправки формы -->
            <BaseButton type="submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" :class="$style.spinner" />
                {{ isSubmitting ? 'Бронирую...' : 'Забронировать столик' }}
            </BaseButton>
        </div>
    </form>
</template>


<style module src="./BookingForm.module.scss" />