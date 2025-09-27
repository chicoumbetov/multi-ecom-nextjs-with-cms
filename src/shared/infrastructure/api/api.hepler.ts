import { AxiosError } from "axios";

export const getContentType = () => ({
	'Content-type': 'application/json'
})

interface ErrorResponseData {
    message: string | string[];
}

export const errorCatch = <T = ErrorResponseData>(error: AxiosError<T>): string => {
	const data = error.response?.data as { message?: any };

    const message = data?.message;

	return message
        ? typeof message === 'object' && Array.isArray(message)
            ? message[0]
            : message
        : error.message
}
