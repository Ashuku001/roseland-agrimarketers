import {useEffect, useState} from "react"
import { useSearchParams } from "next/navigation"
import {Button} from "@/components/ui/button"
import {ArrowLeftIcon} from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { zodResolver } from "@hookform/resolvers/zod"
//@ts-ignore
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCart } from "@/hooks/use-Cart-Store"
import { Input } from "./ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { CheckoutProduct } from "./modals/PaymentModal"

const FormSchema = z.object({
    phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
        message: "Invalid Kenyan phone number. It should be exactly 9 digits."
      }),
    code: z.string().optional()
})

export const MpesaPayment = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const searchParams = useSearchParams()
    const [items, paymentMethod, removeAll, addPaymentMethod] = useCart((state) => [state.items, state.paymentMethod, state.removeAll, state.addPaymentMethod])
  
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.totalPrice)
    }, 0)
    
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        let phoneNumber = "254"
        if(data.phoneNumber.length == 10 ){
            phoneNumber += data.phoneNumber.slice(1)
        } else if( data.phoneNumber.length == 9){
            phoneNumber += data.phoneNumber
        }
        
        if(paymentMethod == "mpesa"){
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
              `${process.env.NEXT_PUBLIC_API_URL}/mpesa-checkout`,{
                  products,
                  phoneNumber: phoneNumber,
                  totalPrice: totalPrice,
            })
            
            window.location = response.data.url;
        }
        setLoading(false);
    }

    return (
      <div className="flex flex-col space-y-2 ">
        <Form {...form}>
            <form id="form" onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <div className="">
                    <FormLabel>Phone number</FormLabel> 
                    <div className="flex space-x-1">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="w-20">
                                    <FormControl >
                                        <Input
                                            disabled
                                            placeholder="+254"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="focus-visible:ring-0 w-20"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl >
                                        <Input
                                            id="phoneNumber"
                                            placeholder="7XXXXXXXX"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="focus-visible:ring-0 flex-1"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
        <div className="flex justify-end space-x-2">
            <Button 
                className=""
                type="button"
                disabled={loading}
                onClick={() => {addPaymentMethod(null)}}
            >
                <ArrowLeftIcon size="20"/>
                Back
            </Button>
            <Button 
                className=""
                type="submit"
                form="form"
                disabled={loading}
            >
                Continue
            </Button>
        </div>
      </div>
    )
}