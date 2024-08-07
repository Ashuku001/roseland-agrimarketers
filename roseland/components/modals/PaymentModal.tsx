import { Modal } from "@/components/ui/Modal"
import {usePaymentModal} from "@/hooks/use-Payment-modal"
import {RadioGroupForm} from "../PaymentOptions"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { useCart } from "@/hooks/use-Cart-Store"
import { formatter } from "@/utils/utils"
import { LoadingSpinner } from "../LoadingSpinner"
import { MpesaPayment } from "../MpesaPayment"

export type CheckoutProduct = {
  id: number;
  name: string;
  price: number; 
  totalPrice: number;
  quantity: number; 
}

function PaymentModal() {
    const paymentModal = usePaymentModal()
    const [loading, setLoading] = useState(false)
    const [items, paymentMethod,  addPaymentMethod] = useCart((state) => [state.items, state.paymentMethod, state.addPaymentMethod])

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.totalPrice)
    }, 0)

    useEffect(() => {
      const onCheckout = async () => {
        if(paymentMethod == "visa"){
          setLoading(true)
          const products = items.reduce((acc, item) => {
            acc = [...acc, {
                      id: item.id, 
                      name: item.name,
                      price: item.price, 
                      totalPrice: item.totalPrice, 
                      quantity: item.quantity
                  }]
            return acc
          }, new Array<CheckoutProduct>)
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe-checkout`,{
                products: products
          })
          window.location = response.data.url;
        }
        setLoading(false);
      }
      if(paymentMethod == "visa"){
        onCheckout()
      }
      setLoading(false)
    }, [paymentMethod])

    useEffect(() => {
      if(!paymentModal.isOpen){
        setLoading(false);
        addPaymentMethod(null)
      }
    }, [paymentModal.isOpen, setLoading, addPaymentMethod])

    return (
        <Modal 
            open={paymentModal.isOpen}
            onClose={loading? paymentModal.onOpen : paymentModal.onClose}
            className="w-[550px]"
            loading={loading}
        >
            <div className="w-full">
              <div className="bg-muted p-3 rounded-md">
                <h2 className="text-lg font-medium text-gray-900">
                    Order Summary
                </h2>
                <div className="my-2 space-x-4">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div className="text-base font-medium text-gray-900">
                            {formatter.format(totalPrice)}
                        </div>
                    </div>
                </div>
              </div>
              {loading 
                ? <LoadingSpinner /> 
                :
                <div>
                  {paymentMethod == "mpesa" 
                    ? <MpesaPayment/>
                    :
                    <div>
                      <h1 className="text-lg font-medium text-gray-900 my-2">Select a payment method</h1>
                      <RadioGroupForm loading={loading}/>
                    </div>
                  }
                </div>
              }
            </div>
        </Modal>
    )
}

export default PaymentModal
