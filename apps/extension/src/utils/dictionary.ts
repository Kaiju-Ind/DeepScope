/**
 * String-keyed records whose keys may come from a web page.
 *
 * Pages control many of the strings DeepScope uses as keys: meta names, cookie
 * names, header names, JavaScript global paths, and attribute names. An ordinary
 * object literal inherits from `Object.prototype`, so two things go wrong with
 * such keys:
 *
 * - **Reads** return inherited members. `record['constructor']` is the `Object`
 *   function, not `undefined`, so code that expects an array or a rule bucket
 *   receives a function and throws.
 * - **Writes** can change the object's prototype. `record['__proto__'] = value`
 *   calls the inherited setter instead of storing data.
 *
 * Records built here have no prototype, so every key, including `__proto__` and
 * `constructor`, is stored and returned as plain data. Structured clone, runtime
 * messaging, and `JSON.parse` give the prototype back to an object that crosses
 * an extension context. Lookups therefore go through {@link get} or {@link has},
 * which check own properties, instead of trusting where the record came from.
 *
 * @module
 */

/** A string-keyed record that may hold page-controlled keys. */
export type Dictionary<Value> = Record<string, Value>;

/** Create an empty record with no prototype. */
export function create<Value>(): Dictionary<Value> {
	return Object.create(null) as Dictionary<Value>;
}

/**
 * Build a prototype-free record from key/value pairs.
 *
 * A later pair replaces an earlier pair with the same key, matching
 * `Object.fromEntries`.
 */
export function fromEntries<Value>(entries: Iterable<readonly [string, Value]>): Dictionary<Value> {
	const record = create<Value>();
	for (const [key, value] of entries) record[key] = value;
	return record;
}

/** Copy any record into a prototype-free record. */
export function from<Value>(source: Readonly<Record<string, Value>>): Dictionary<Value> {
	return fromEntries(Object.entries(source));
}

/** Return whether `key` is an own entry of `record`, never an inherited member. */
export function has(record: Readonly<Record<string, unknown>> | undefined, key: string): boolean {
	return record !== undefined && Object.hasOwn(record, key);
}

/** Read an own entry, or `undefined` when the key is absent or only inherited. */
export function get<Value>(record: Readonly<Record<string, Value>> | undefined, key: string): Value | undefined {
	return record !== undefined && Object.hasOwn(record, key) ? record[key] : undefined;
}
