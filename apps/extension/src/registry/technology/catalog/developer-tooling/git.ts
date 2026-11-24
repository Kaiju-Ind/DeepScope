import type { TechnologyDefinition } from '@/lib/detection/types';

export const gitTechnologyDefinition: TechnologyDefinition = {
	id: 'git',
	name: 'git',
	website: 'https://git-scm.com',
	icon: 'git.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'git:meta:0',
			kind: 'meta',
			key: 'generator',
			valuePattern: new RegExp('\\bgit\\/([\\d.]+\\d)', 'i'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Meta tag matches a known technology marker.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:git-scm:git:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;
