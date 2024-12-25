'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

export async function getCurrentUser() {
    try {
        const authHeaders = localStorage.getItem('authHeaders')
        if (!authHeaders) {
            throw new Error('認証情報がありません')
    }

    const headers = {
        'Content-Type': 'application/json',
        ...JSON.parse(authHeaders)
    }

    const response = await fetch(`${API_BASE_URL}/user/me`, {
      method: 'GET',
      headers: headers,
    })

    if (!response.ok) {
      throw new Error('ユーザー情報の取得に失敗しました')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching user:', error)
    return { success: false, error: 'ユーザー情報の取得に失敗しました' }
  }
} 