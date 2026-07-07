import type { TechnologyDefinition } from '../../types';

export const mavoTechnologyDefinition = {
	id: "mavo",
	name: "Mavo",
	website: "https://mavo.io",
	description: "Mavo is a JavaScript library that enables web developers to turn regular HTML into reactive web applications without the need for writing custom JavaScript.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mavo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Mavo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mavo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mavo.version",
			valuePattern: new RegExp("v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
