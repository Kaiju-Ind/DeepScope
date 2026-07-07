import type { TechnologyDefinition } from '../../types';

export const camanjsTechnologyDefinition = {
	id: "camanjs",
	name: "CamanJS",
	website: "https://github.com/meltingice/CamanJS",
	description: "CamanJS is a JavaScript library designed for image editing directly on the browser, allowing manipulation of canvas elements.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "camanjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "Caman",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "camanjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "Caman.version.release",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
