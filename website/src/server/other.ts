'use server'

import { setCookie } from "@/helpers/logic/security";

export async function changeThemeApi(prevState: any, formData: FormData): Promise<any> {
    const theme = formData.get('theme')?.toString() ?? 'light';
    setCookie({
        key: 'theme',
        value: theme,
        path: '/',
        httpOnly: true,
        secure: false,
    })
}