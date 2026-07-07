import type { TechnologyDefinition } from '../../types';

export const yepsTechnologyDefinition = {
	id: "yeps",
	name: "Yeps",
	website: "https://yeps.io",
	description: "Yeps is a minimalist bar that can be added to the top or bottom of your website to collect visitor’s emails and promote content.",
	icon: "Yeps.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "yeps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.yeps\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yeps:jsGlobal:1",
			kind: "jsGlobal",
			property: "Yeps",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
