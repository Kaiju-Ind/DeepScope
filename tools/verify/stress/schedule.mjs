/** Small, fast, seedable PRNG (mulberry32). */
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6D2B79F5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Parse duration and size options into a plan. */
export function plan(options = {}) {
	const quick = Boolean(options.quick);
	const minutes = Number(options.minutes ?? (quick ? 1.5 : 5));
	return {
		seed: Number(options.seed ?? Date.now() % 1_000_000),
		quick,
		durationMs: Math.max(20_000, minutes * 60_000),
		maxTabs: Number(options.tabs ?? (quick ? 10 : 24)),
		maxWindows: Number(options.windows ?? (quick ? 2 : 4)),
		real: options.real !== false,
		idle: options.idle ?? !quick,
	};
}

/** Share one random stream across every owner so a seed keeps its draw order. */
export function random(seed) {
	const rnd = mulberry32(seed);
	/** Draw an integer in [0, n); callers provide a non-empty candidate set. */
	const int = (n) => Math.floor(rnd() * n);
	/** Preserve the run's probability draw even when a branch does not execute. */
	const chance = (p) => rnd() < p;
	/** Choose from the current candidates without keeping a second random stream. */
	const pick = (list) => list[int(list.length)];
	return { rnd, int, chance, pick };
}
