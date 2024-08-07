'use client'
import React, { useEffect, useState } from 'react'
import PaymentModal from "@/components/modals/PaymentModal"

function PaymentModalProvider() {
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!isMounted) return null; 


    return (
        <>
            <PaymentModal/>
        </>
    )
}

export default PaymentModalProvider
