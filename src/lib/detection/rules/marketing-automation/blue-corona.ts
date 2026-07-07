import type { TechnologyDefinition } from '../../types';

export const blueCoronaTechnologyDefinition = {
	id: "blue-corona",
	name: "Blue Corona",
	website: "https://www.bluecorona.com",
	description: "Blue Corona is a provider of digital strategies and marketing systems designed to support the promotion and management of commercial services.",
	icon: "BlueCorona.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "blue-corona:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("reports\\.bluecorona\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
