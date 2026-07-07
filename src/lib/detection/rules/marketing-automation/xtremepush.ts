import type { TechnologyDefinition } from '../../types';

export const xtremepushTechnologyDefinition = {
	id: "xtremepush",
	name: "Xtremepush",
	website: "https://xtremepush.com",
	description: "Xtremepush is a customer engagement, personalisation and data platform. It's purpose-built for multichannel and mobile marketing.",
	icon: "Xtremepush.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "xtremepush:jsGlobal:0",
			kind: "jsGlobal",
			property: "xtremepush",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
