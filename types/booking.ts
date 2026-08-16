export interface BookingFormData {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
}

export type BookingField = keyof BookingFormData
export type BookingFormErrors = Partial<Record<keyof BookingFormData, string>>
export type BookingStatus = 'idle' | 'loading' | 'success'