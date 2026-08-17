/** Successful operation result. */
export type Success<Value> = {
	readonly ok: true;
	readonly value: Value;
};

/** Failed operation result carrying a typed failure value. */
export type Failure<Problem> = {
	readonly ok: false;
	readonly error: Problem;
};

/** Explicit success/failure result for operations that do not throw expected problems. */
export type Result<Value, Problem> = Success<Value> | Failure<Problem>;

/** Create a successful result. */
export function success<Value>(value: Value): Success<Value> {
	return { ok: true, value };
}

/** Create a failed result. */
export function failure<Problem>(error: Problem): Failure<Problem> {
	return { ok: false, error };
}
