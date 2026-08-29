import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, '.agents', 'benchmarks');
const outputFile = path.join(outputDirectory, 'run.mjs');

await mkdir(outputDirectory, { recursive: true });
await build({
	absWorkingDir: root,
	entryPoints: ['src/benchmarks/run.ts'],
	outfile: outputFile,
	bundle: true,
	format: 'esm',
	platform: 'node',
	target: 'node22',
	packages: 'external',
	treeShaking: false,
	alias: {
		'@': path.join(root, 'src'),
		'~': path.join(root, 'src'),
	},
});

const child = spawn(process.execPath, ['--expose-gc', outputFile], {
	cwd: root,
	env: process.env,
	stdio: 'inherit',
});

const exitCode = await new Promise((resolve, reject) => {
	child.once('error', reject);
	child.once('exit', (code, signal) => {
		if (signal) reject(new Error(`Benchmark process exited from signal ${signal}.`));
		else resolve(code ?? 1);
	});
});

process.exitCode = exitCode;
