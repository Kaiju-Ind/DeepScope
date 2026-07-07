import type { TechnologyDefinition } from '../../types';

export const leaflyTechnologyDefinition = {
	id: "leafly",
	name: "Leafly",
	website: "https://www.leafly.com",
	description: "Leafly is a platform that provides information on cannabis strains, products, and dispensaries, allowing users to research, locate, and order cannabis from licensed providers.",
	icon: "Leafly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "leafly:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.leafly\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
