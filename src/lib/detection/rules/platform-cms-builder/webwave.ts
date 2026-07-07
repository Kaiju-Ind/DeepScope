import type { TechnologyDefinition } from '../../types';

export const webwaveTechnologyDefinition = {
	id: "webwave",
	name: "WebWave",
	website: "https://webwavecms.com",
	description: "WebWave is a drag and drop website builder.",
	icon: "WebWave.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webwave:jsGlobal:0",
			kind: "jsGlobal",
			property: "webwave.getAppVersion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webwave:jsGlobal:1",
			kind: "jsGlobal",
			property: "webwaveFontsLoadedFlag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
