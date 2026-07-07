import type { TechnologyDefinition } from '../../types';

export const extendTechnologyDefinition = {
	id: "extend",
	name: "Extend",
	website: "https://www.extend.com",
	description: "Extend is a service that offers brands product and shipping protection, creating a new revenue source while enhancing customer loyalty and trust.",
	icon: "Extend.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "extend:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.helloextend\\.com\\/extend-sdk-client\\/v([\\d.]+)\\/extend-sdk-client\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extend:jsGlobal:1",
			kind: "jsGlobal",
			property: "Extend",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
