'use server'

import { revalidatePath } from 'next/cache'
import { signUpSchema, loginSchema } from '@/lib/schemas'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

export async function signUp(formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return { success: false, message: 'バリデーションエラー' }
  }

  const { name, user_id, email, password } = result.data

  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registration: {
          name: name,
          user_id: user_id,
          email: email,
          password: password,
          password_confirmation: password
        }
      }),
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

export async function login(formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData))

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
      body: JSON.stringify({
        email: identifier,
        password: password
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { 
        success: false, 
        message: data.errors?.join(', ') || 'ログインに失敗しました' 
      }
    }

    // トークンを返す
    const authHeaders = {
      'access-token': response.headers.get('access-token'),
      'client': response.headers.get('client'),
      'uid': response.headers.get('uid'),
    }

    revalidatePath('/login')
    return { 
      success: true, 
      message: 'ログインしました',
      authHeaders 
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, message: 'サーバーとの通信に失敗しました' }
  }
}

