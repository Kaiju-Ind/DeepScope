import type { TechnologyDefinition } from '../../types';

export const sophiTechnologyDefinition = {
	id: "sophi",
	name: "Sophi",
	website: "https://www.mathereconomics.com/sophi-start",
	description: "Sophi is a suite of AI-powered optimization, prediction, and automation solutions designed to unlock content value and drive business transformation.",
	icon: "Sophi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sophi:jsGlobal:0",
			kind: "jsGlobal",
			property: "SOPHIDATA.settings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sophi:jsGlobal:1",
			kind: "jsGlobal",
			property: "sophi.settings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sophi:jsGlobal:2",
			kind: "jsGlobal",
			property: "sophiSegments",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
