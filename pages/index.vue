<script setup lang="ts">
    import BookingForm from '~/components/BookingForm/BookingForm.vue';
    import type { BookingFormData } from '~/types/booking';

    const view = ref<'form' | 'success'>('form')
    const lastBooking = ref<BookingFormData | null>(null)

    // Переходы между компонентами
    function handleSuccess(data: BookingFormData) {
        lastBooking.value = data
        view.value = 'success'
    }

    function handleReset() {
    view.value = 'form'
    lastBooking.value = null
    }
</script>

<template>
    <main class="page">
        <Transition name="fade" mode="out-in">
        <BookingForm
            v-if="view === 'form'"
            key="form"
            @success="handleSuccess"
        />
        <ConfirmationScreen
            v-else-if="lastBooking"
            key="success"
            :booking="lastBooking"
            @reset="handleReset"
        />
        </Transition>
    </main>
</template>

<style scoped>
    .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    }

    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
    }

    .fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
    }
</style>