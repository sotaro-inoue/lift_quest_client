import * as z from "zod"
export const signUpSchema = z.object({
    name: z.string().min(1, { message: "名前は必須です" }),
    user_id: z.string()
        .min(2, { message: "ユーザーIDは1文字以上で入力してください" })
        .max(20, { message: "ユーザーIDは20文字以下で入力してください" })
        .regex(/^@[a-zA-Z0-9_]+$/, { message: "ユーザーIDは半角英数字とアンダースコアのみ使用できます" })
        .transform(val => val.startsWith('@') ? val : `@${val}`),
    email: z.string().email({ message: "正しいメールアドレスの形式を入力してください" }),
    password: z.string().min(6, { message: "パスワードは6文字以上で入力してください" }),
})
export const loginSchema = z.object({
    identifier: z.string()
        .regex(/^[@a-zA-Z0-9_.@+-]+$/, { 
            message: "無効な文字が含まれています" 
        }),
    password: z.string().min(1, { message: "パスワードは必須です" }),
})
