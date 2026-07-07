import type { TechnologyDefinition } from '../../types';

export const technology91appTechnologyDefinition = {
	id: "91app",
	name: "91App",
	website: "https://91app.com",
	description: "91App is a Taiwan-based platform that provides solutions for retail stores.",
	icon: "91App.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "91app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.91app\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
