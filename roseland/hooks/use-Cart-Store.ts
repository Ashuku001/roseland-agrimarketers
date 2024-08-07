import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";
import {produce} from 'immer';

import { Product, CartItemType } from "@/types";

type PaymentType = "mpesa" | "visa" | null

interface CartStore {
    items: CartItemType[];
    paymentMethod: PaymentType;
}

interface CartStoreActions {
    addItem: (data: Product) => void;
    removeItem: (id: number) => void;
    removeAll: () => void;
    addPaymentMethod: (paymentMethod: PaymentType) => void;
    updateQuantity: (quantity: number, itemId: number) => void;
}

export const useCart = create(
    persist<CartStore & CartStoreActions>((set, get) => ({
        items: [],
        paymentMethod: null,
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem) {
                existingItem.quantity += 1
                existingItem.totalPrice = existingItem.quantity * existingItem.price
                return toast("Item updated in cart")
            }

            set({items: [...get().items, {...data, quantity:1, totalPrice: data.quantity * data.price}]});
            toast.success("Item added to cart")
        },
        updateQuantity: (quantity: number, itemId: number) => {
            set(produce((draft) => {
                
                const currentItems: CartItemType[] = draft.items;
                const existingItem = currentItems.find((item) => item.id === itemId);
                if(existingItem) {
                    console.log(quantity)
                    existingItem.quantity = quantity
                    existingItem.totalPrice = existingItem.quantity * existingItem.price
                } else{
                    toast.error("Something went wrong.")
                }
            }))
            
        },
        removeItem: (id: number) => {
            set({items: [...get().items.filter((item => item.id !== id))]});
            toast.success("Item removed from the cart.")
        },
        removeAll: () => set({items: []}),
        addPaymentMethod: (paymentMethod: PaymentType) => {
            set({paymentMethod})
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)