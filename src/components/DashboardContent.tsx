'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

interface DashboardContentProps {
    userId: string
}

export function DashboardContent({ userId }: DashboardContentProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const validateAccess = async () => {
            try {
                const authHeaders = localStorage.getItem('authHeaders')
                if (!authHeaders) {
                    router.push('/login')
                    return
                }

                const result = await getCurrentUser()
                
                if (!result.success) {
                    setError(result.error as string)
                    router.push('/login')
                    return
                }

                const currentUserId = result.data.user_id
                if (currentUserId !== userId) {
                    router.push(`/dashboard/${currentUserId}`)
                    return
                }

                setIsLoading(false)
            } catch (error) {
                console.error('認証エラー:', error)
                router.push('/login')
            }
        }

        validateAccess()
    }, [userId, router])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">ようこそ {userId} さん</h2>
        </div>
    )
} 