import { appError, type AppError, type ErrorCode } from './errors';

export type AppSuccess<T> = {
	ok: true;
	value: T;
};

export type AppFailure = {
	ok: false;
	error: AppError;
};

export type AppResult<T> = AppSuccess<T> | AppFailure;

export function ok<T>(value: T): AppSuccess<T> {
	return { ok: true, value };
}

export function fail(error: AppError): AppFailure {
	return { ok: false, error };
}

export function errorResponse(code: ErrorCode, message: string, stack?: string): AppFailure {
	return fail(appError(code, message, stack));
}
