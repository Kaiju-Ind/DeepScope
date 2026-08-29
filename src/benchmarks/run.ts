import { run } from 'mitata';

const suite = process.env.KAIJU_DEEPSCOPE_BENCH_SUITE ?? 'all';

if (suite === 'rules') {
	await import('./rule-detection-profile.bench.ts');
} else if (suite === 'all') {
	await import('./content-bootstrap-observation.bench.ts');
	await import('./matcher-shard-hydration.bench.ts');
	await import('./observation-batch-controller.bench.ts');
	await import('./observation-matcher.bench.ts');
	await import('./partitioned-matcher.bench.ts');
	await import('./registry-compiler.bench.ts');
	await import('./rule-detection-profile.bench.ts');
	await import('./scheduler-fairness.bench.ts');
} else {
	throw new Error(`Unknown DeepScope benchmark suite: ${suite}`);
}

await run({ throw: true });
