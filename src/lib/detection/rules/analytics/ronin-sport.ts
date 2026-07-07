import type { TechnologyDefinition } from '../../types';

export const roninSportTechnologyDefinition = {
	id: "ronin-sport",
	name: "Ronin Sport",
	website: "https://www.roninsport.io",
	description: "Ronin Sport is a provider of high-quality sports TV data solutions that enhance engagement and drive revenue.",
	icon: "RoninSport.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ronin-sport:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.roninsport\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
