import type { TechnologyDefinition } from '@/lib/detection/types';

export const haskellTechnologyDefinition: TechnologyDefinition = {
	id: 'haskell',
	name: 'Haskell',
	website: 'https://wiki.haskell.org/Haskell',
	icon: 'Haskell.png',
	categories: [
		'developer-tooling',
	],
	rules: [],
} as const satisfies TechnologyDefinition;
