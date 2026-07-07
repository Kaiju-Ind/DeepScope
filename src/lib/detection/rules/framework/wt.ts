import type { TechnologyDefinition } from '../../types';

export const wtTechnologyDefinition = {
	id: "wt",
	name: "Wt",
	website: "https://www.webtoolkit.eu/wt",
	description: "Wt is a C++ library for developing web applications.",
	icon: "Wt.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "wt:jsGlobal:0",
			kind: "jsGlobal",
			property: "Wt.WT.$",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wt:jsGlobal:1",
			kind: "jsGlobal",
			property: "WtOnLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wt:jsGlobal:2",
			kind: "jsGlobal",
			property: "WtSignalEmit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
