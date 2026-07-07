import type { TechnologyDefinition } from '../../types';

export const sizeyTechnologyDefinition = {
	id: "sizey",
	name: "Sizey",
	website: "https://my.sizey.ai",
	description: "Sizey is a platform that enables online fashion brands to efficiently manage apparel sizes, reducing product returns and improving customer satisfaction.",
	icon: "Sizey.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sizey:jsGlobal:0",
			kind: "jsGlobal",
			property: "sizeyAtcAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sizey:jsGlobal:1",
			kind: "jsGlobal",
			property: "sizeyapps.cart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
