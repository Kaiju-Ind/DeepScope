import type { TechnologyDefinition } from '../../types';

export const haskellTechnologyDefinition = {
	id: "haskell",
	name: "Haskell",
	website: "https://wiki.haskell.org/Haskell",
	icon: "Haskell.png",
	categories: [
		"developer-tooling",
	],
	rules: [],
} as const satisfies TechnologyDefinition;
