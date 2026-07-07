import type { TechnologyDefinition } from '../../types';

export const satuTechnologyDefinition = {
	id: "satu",
	name: "Satu",
	website: "https://satu.kz",
	description: "Satu is a marketplace offering consumer, industrial, and wholesale products for business, home, and leisure needs.",
	icon: "Satu.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "satu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.satu\\.kz\\/.*\\/v([\\d\\.]+)\\/bare\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "satu:jsGlobal:1",
			kind: "jsGlobal",
			property: "CLERK_CONFIG.endpointUrl",
			valuePattern: new RegExp("\\.satu\\.kz\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
