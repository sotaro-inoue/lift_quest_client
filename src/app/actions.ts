'use server'

import { revalidatePath } from 'next/cache'
import { signUpSchema, loginSchema } from '@/lib/schemas'
import { z } from 'zod'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

export async function signUp(data: z.infer<typeof signUpSchema>) {
  const result = signUpSchema.safeParse(data)

  if (!result.success) {
    console.log('Validation error:', result.error);
    return { success: false, message: 'バリデーションエラー' }
  }

  const { name, user_id, email, password } = result.data
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, user_id, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.errors?.join(', ') || 'アカウント作成に失敗しました'
      }
    }

    revalidatePath('/signup')
    return { success: true, message: 'アカウントが作成されました' }
  } catch (error) {
    console.error('Signup error:', error)
    return { success: false, message: 'サーバーとの通信に失敗しました' }
  }
}

export async function login(data: z.infer<typeof loginSchema>) {
  const result = loginSchema.safeParse(data)

  if (!result.success) {
    return { success: false, message: 'バリデーションエラー' }
  }

  const { identifier, password } = result.data

  try {
    const response = await fetch(`${API_BASE_URL}/auth/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: responseData.errors?.join(', ') || 'ログインに失敗しました'
      }
    }

    const authHeaders = {
      'access-token': response.headers.get('access-token'),
      'client': response.headers.get('client'),
      'uid': response.headers.get('uid'),
    }

    return {
      success: true,
      message: 'ログインしました',
      authHeaders,
      data: responseData.data
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'サーバーとの通信に失敗しました' }
  }
}

