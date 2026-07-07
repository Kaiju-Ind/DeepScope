import type { TechnologyDefinition } from '../../types';

export const adlineTechnologyDefinition = {
	id: "adline",
	name: "Adline",
	website: "https://adline.com",
	description: "Adline is an advertising & analytics software that helps launch multichannel ads with automatic ad optimization.",
	icon: "Adline.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adline:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("prod\\.api\\.adline\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adline:jsGlobal:1",
			kind: "jsGlobal",
			property: "adlineConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
