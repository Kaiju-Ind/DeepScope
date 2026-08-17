import type { TechnologyDefinition } from '@/lib/detection/types';

export const sqliteTechnologyDefinition: TechnologyDefinition = {
	id: 'sqlite',
	name: 'SQLite',
	website: 'https://www.sqlite.org',
	icon: 'SQLite.png',
	categories: [
		'server-runtime-infra',
	],
	rules: [],
	metadata: {
		cpe: 'cpe:2.3:a:sqlite:sqlite:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
