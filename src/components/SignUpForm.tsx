'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signUpSchema } from "@/lib/schemas"
import { signUp } from '@/app/actions'
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            user_id: "@",
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: SignUpFormData) {
        setIsLoading(true)
        setMessage('')

        try {
            const result = await signUp(data)
            if (result.success) {
                setMessage('アカウントが作成されました')
                router.push('/login')
            } else {
                setMessage(result.message || 'アカウント作成時にエラーが発生しました')
            }
        } catch (error: unknown) {
            console.error(error);
            setMessage('エラーが発生しました')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto mt-8 mb-8">
            <CardHeader>
                <CardTitle>アカウント作成</CardTitle>
                <CardDescription>新しいアカウントを作成してください。</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ユーザーネーム</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ユーザーID</FormLabel>
                                    <FormControl>
                                        <div className="flex">
                                            <span className="flex items-center px-3 bg-background border border-r-0 rounded-l-md">
                                                @
                                            </span>
                                            <Input
                                                {...field}
                                                value={field.value.replace('@', '')}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
                                                    field.onChange(`@${value}`);
                                                }}
                                                className="rounded-l-none placeholder:text-foreground/40"
                                                placeholder="user_id"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <FormControl>
                                        <Input {...field} 
                                                type="email"
                                                className="placeholder:text-foreground/40"
                                                placeholder="example@example.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>パスワード</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                            {isLoading ? '処理中...' : 'アカウント作成'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <p className="text-center text-sm">
                    アカウントをお持ちの場合は、
                    <Link href="/login" className="font-bold underline">
                        こちらから
                    </Link>
                </p>
                {message && (
                    <Alert>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
            </CardFooter>
        </Card>
    )
}
