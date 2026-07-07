import type { TechnologyDefinition } from '../../types';

export const babelTechnologyDefinition = {
	id: "babel",
	name: "Babel",
	website: "https://babeljs.io",
	description: "Babel is a free and open-source transcompiler for writing next generation JavaScript.",
	icon: "Babel.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "babel:jsGlobal:0",
			kind: "jsGlobal",
			property: "_babelPolyfill",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
