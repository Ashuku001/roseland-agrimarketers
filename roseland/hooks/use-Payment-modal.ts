import { create } from "zustand";


interface PaymentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePaymentModal = create<PaymentModalStore>((set) => ({
    isOpen: false,
    onOpen:() => set({ isOpen:true}),
    onClose: () => set({isOpen:false})
}))