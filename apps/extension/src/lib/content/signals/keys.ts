import type { CookieSignals, StorageSignals } from "@deepscope/detection/types";
import * as dictionary from "@deepscope/detection/observations/dictionary";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";

/** Retain decoded cookie names only, using a null-prototype presence map and the shared count cap. */
export function collectCookieNames(cookieString: string): CookieSignals {
	return dictionary.fromEntries(
		cookieString
			.split(';')
			.map((part) => part.trim())
			.filter(Boolean)
			.map((part) => {
				const index = part.indexOf('=');
				const name = index === -1 ? part : part.slice(0, index);
				return [safeDecode(name), true] as const;
			})
			.slice(0, SOURCE_LIMITS.cookieNames),
	);
}

/** Read local and session storage names independently; values never enter collected signals. */
export function collectStorageKeys(): StorageSignals {
	return {
		localStorage: collectStorageAreaKeys(() => globalThis.localStorage),
		sessionStorage: collectStorageAreaKeys(() => globalThis.sessionStorage),
	};
}

/** Bound a presence-only storage-key scan and return an empty own-key map when browser policy denies access. */
function collectStorageAreaKeys(getStorage: () => Storage): Record<string, true> {
	try {
		const storage = getStorage();
		const keys: Array<[string, true]> = [];
		for (let index = 0; index < storage.length && keys.length < SOURCE_LIMITS.storageKeys; index += 1) {
			const key = storage.key(index);
			if (key) {
				keys.push([key, true]);
			}
		}
		return dictionary.fromEntries(keys);
	} catch {
		return dictionary.create();
	}
}

/** Decode a cookie name when valid and preserve the original spelling when its percent escapes are malformed. */
function safeDecode(value: string): string {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}
