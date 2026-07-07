/**
 * Standard 32-bit FNV-1a starting seed.
 *
 * FNV calls this value the "offset basis." In plain English, it is the initial
 * hash state used before any input bytes are processed.
 *
 * FNV-1a does not start from zero because zero is a weak starting point for this
 * style of repeated mixing. Instead, standard FNV-1a starts from a fixed
 * non-zero value. For 32-bit FNV-1a, that value is:
 *
 * ```ts
 * 0x811c9dc5
 * ```
 *
 * RFC 9923 lists this value as the standard 32-bit FNV basis. The basis was
 * derived by running the older FNV-0 algorithm over this 32-byte ASCII string:
 *
 * ```text
 * chongo <Landon Curt Noll> /\../\
 * ```
 *
 * Keeping the standard basis matters because it lets this implementation match
 * common FNV-1a 32-bit reference vectors:
 *
 * ```ts
 * createFnv1a32Hash("").toString(16); // "811c9dc5"
 * createFnv1a32Hash("a").toString(16); // "e40c292c"
 * createFnv1a32Hash("foobar").toString(16); // "bf9cf968"
 * ```
 *
 * Changing this value would still produce a deterministic non-cryptographic
 * hash, but it would no longer be standard FNV-1a 32-bit.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9923.html
 */
const FNV_1A_32_OFFSET_BASIS = 0x811c9dc5;

/**
 * Standard 32-bit FNV prime.
 *
 * FNV-1a mixes each input byte in two steps:
 *
 * ```ts
 * hash ^= byte;
 * hash *= FNV_1A_32_PRIME;
 * ```
 *
 * The XOR step folds the next byte into the current hash state. The multiply
 * step spreads that change across the 32-bit state so later bytes are affected
 * by earlier bytes.
 *
 * For 32-bit FNV-1a, the standard prime is:
 *
 * ```ts
 * 0x01000193
 * ```
 *
 * In decimal, that is:
 *
 * ```ts
 * 16_777_619
 * ```
 *
 * The exact prime is part of the algorithm. Replacing it would create a custom
 * FNV-like hash rather than standard FNV-1a 32-bit.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9923.html
 */
const FNV_1A_32_PRIME = 0x01000193;

const storageHashTextEncoder = new TextEncoder();

/**
 * Compute the unsigned 32-bit FNV-1a hash for a JavaScript string.
 *
 * The return value is the raw numeric FNV-1a result before storage-key
 * formatting. Keeping this as a separate function makes the storage wrapper
 * easy to read and gives tests a direct place to verify known FNV-1a vectors.
 *
 * Example reference checks:
 *
 * ```ts
 * createFnv1a32Hash("").toString(16).padStart(8, "0");
 * // "811c9dc5"
 *
 * createFnv1a32Hash("a").toString(16).padStart(8, "0");
 * // "e40c292c"
 *
 * createFnv1a32Hash("foobar").toString(16).padStart(8, "0");
 * // "bf9cf968"
 * ```
 *
 * The loop follows the FNV-1a order:
 *
 * ```ts
 * hash ^= byte;
 * hash = Math.imul(hash, FNV_1A_32_PRIME);
 * ```
 *
 * The order matters. FNV-1 and FNV-1a use the same constants, but they apply
 * XOR and multiplication in opposite order:
 *
 * ```ts
 * // FNV-1
 * hash = multiply(hash, prime);
 * hash ^= byte;
 *
 * // FNV-1a
 * hash ^= byte;
 * hash = multiply(hash, prime);
 * ```
 *
 * Kaiju Site Scope uses FNV-1a because it is the common variant used for compact
 * non-cryptographic byte hashing.
 *
 * JavaScript-specific notes:
 *
 * - `TextEncoder.encode(value)` returns UTF-8 bytes as a `Uint8Array`.
 * - `Math.imul(a, b)` performs C-like 32-bit integer multiplication.
 * - `hash >>> 0` keeps the same 32 bits but interprets them as unsigned.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9923.html
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift
 */
export function createFnv1a32Hash(value: string): number {
	let hash = FNV_1A_32_OFFSET_BASIS;
	const bytes = storageHashTextEncoder.encode(value);

	for (const byte of bytes) {
		// FNV-1a folds the next byte into the current state before multiplying.
		hash ^= byte;

		// The multiply step intentionally stays in 32-bit integer space.
		hash = Math.imul(hash, FNV_1A_32_PRIME);
	}

	// JavaScript may treat the 32-bit result as signed, so normalize it before
	// callers format or compare the value.
	return hash >>> 0;
}