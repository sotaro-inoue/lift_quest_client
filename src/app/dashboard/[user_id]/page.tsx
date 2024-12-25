import { Metadata } from 'next'
import { DashboardContent } from '@/components/DashboardContent'
import { Suspense } from 'react'

interface PageProps {
    params: {
        user_id: string
    }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const userId = decodeURIComponent(resolvedParams.user_id.toString())
    return {
        title: `${userId}のダッシュボード | LiftQuest`,
        description: 'トレーニング記録を管理・分析',
    }
}

export default async function DashboardPage({ params }: PageProps) {
    const resolvedParams = await params
    const userId = decodeURIComponent(resolvedParams.user_id.toString())

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen flex-col">
            <Suspense fallback={<div>Loading...</div>}>
                <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
                <DashboardContent userId={userId} />
            </Suspense>
        </div>
    )
}