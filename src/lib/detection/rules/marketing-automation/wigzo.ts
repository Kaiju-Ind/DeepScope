import type { TechnologyDefinition } from '../../types';

export const wigzoTechnologyDefinition = {
	id: "wigzo",
	name: "Wigzo",
	website: "https://www.wigzo.com/",
	description: "Wigzo is e-commerce marketing automation platform that helps businesses of every size dig deeper into data to find opportunities to increase their sales and revenue.",
	icon: "Wigzo.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wigzo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.wigzo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wigzo:jsGlobal:1",
			kind: "jsGlobal",
			property: "wigzo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
