import type { TechnologyDefinition } from '../../types';

export const blackCrowTechnologyDefinition = {
	id: "black-crow",
	name: "Black Crow",
	website: "https://www.blackcrow.ai",
	description: "Blackcrow is a platform that analyzes data to improve conversion funnels using AI-driven insights and automated actions.",
	icon: "BlackCrow.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "black-crow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.blackcrow\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "black-crow:jsGlobal:1",
			kind: "jsGlobal",
			property: "blackcrow.BUILD_NUMBER",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "black-crow:jsGlobal:2",
			kind: "jsGlobal",
			property: "blackcrowpreconnected",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
