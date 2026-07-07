import type { TechnologyDefinition } from '../../types';

export const aircallTechnologyDefinition = {
	id: "aircall",
	name: "Aircall",
	website: "https://aircall.io",
	description: "Aircall is a cloud-based phone system for customer support and sales teams.",
	icon: "aircall.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "aircall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/cdn\\.aircall\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aircall:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.aircall\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
