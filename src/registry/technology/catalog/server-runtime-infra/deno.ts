import type { TechnologyDefinition } from '@/lib/detection/types';

export const denoTechnologyDefinition: TechnologyDefinition = {
	id: 'deno',
	name: 'Deno',
	website: 'https://deno.land',
	description: 'A modern runtime for JavaScript and TypeScript.',
	icon: 'deno.svg',
	categories: [
		'server-runtime-infra',
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:deno:deno:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
