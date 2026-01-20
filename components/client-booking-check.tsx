'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ClientBookingCheck() {
    const router = useRouter()

    useEffect(() => {
        const pending = localStorage.getItem('pending_booking')
        if (pending) {
            router.push('/booking/finalize')
        }
    }, [router])

    return null
}
