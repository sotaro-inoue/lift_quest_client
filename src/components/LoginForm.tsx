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
import { loginSchema } from "@/lib/schemas"
import { login } from '@/app/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true)
        setMessage('')

        try {
            const result = await login(data)
            if (result.success) {
                setMessage('ログインしました')
                if (result.authHeaders) {
                    localStorage.setItem('authHeaders', JSON.stringify(result.authHeaders))
                }
                router.push(`/dashboard/${result.data.user_id}`)
            } else {
                setMessage(result.message || 'ログインに失敗しました')
            }
        } catch (error) {
            console.error(error)
            setMessage('エラーが発生しました')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-sm sm:max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">ログイン</CardTitle>
                <CardDescription className="text-center">アカウントにログインしてください。</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => {
                        onSubmit({
                            identifier: data.identifier,
                            password: data.password
                        })
                    })} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem className="px-1 sm:px-2">
                                    <FormLabel>ユーザーID または メールアドレス</FormLabel>
                                    <FormControl>
                                    <Input 
                                        className="placeholder:text-foreground/40"
                                        {...field}
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        placeholder="@user_id または email@example.com"
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
                                <FormItem className="px-1 sm:px-2">
                                    <FormLabel>パスワード</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full mt-6 py-2 sm:py-3 text-sm sm:text-base" disabled={isLoading}>
                            {isLoading ? '処理中...' : 'ログイン'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 px-4 sm:px-6">
                <p className="text-center text-sm">
                    アカウントをお持ちでない場合は、
                    <Link href="/signup" className="font-bold underline">
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

