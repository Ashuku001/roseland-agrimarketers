'use client'
import axios from "axios"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-Cart-Store"
import { formatter } from "@/utils/utils"
import {usePaymentModal} from "@/hooks/use-Payment-modal"

const Summary = () => {
    const searchParams = useSearchParams()
    const paymentModal = usePaymentModal() 
    const [items, removeAll, paymentMethod] = useCart((state) => [state.items, state.removeAll, state.paymentMethod])

    useEffect(() => {
        if(searchParams.get("success")) {
            if(paymentMethod == "visa"){
                toast.success("Payment completed");
                removeAll();
            } else if (paymentMethod == "mpesa"){
                toast.success("😀 Request is successful. Please follow the mpesa prompt to complete your transaction", {duration: 4000})
            }
        }
        if(searchParams.get("cancelled")){
            toast.error("Something went wrong")
        }
    }, [searchParams, removeAll])

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.totalPrice)
    }, 0)

    const onCheckout = async () => {
        paymentModal.onOpen()
    }
    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>
            <div className="mt-6 space-x-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        {formatter.format(totalPrice)}
                    </div>
                </div>
                <Button
                    disabled={!items.length}
                    onClick={() => onCheckout()}
                    className="w-full mt-6"
                >
                    Checkout
                </Button>

            </div>
        </div>
    )
}

export default Summary