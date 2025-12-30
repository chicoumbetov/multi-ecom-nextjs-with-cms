import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	const options: Cookies.CookieAttributes = {
        sameSite: 'strict',
		secure: true,
        expires: 1
    }

	if (process.env.APP_DOMAIN) {
		console.log('process.env.APP_DOMAIN :', process.env.APP_DOMAIN)
        // options.domain = process.env.APP_DOMAIN
    }

	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, options)
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
