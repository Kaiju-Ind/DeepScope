import type { TechnologyDefinition } from '../../types';

export const cyberbizTechnologyDefinition = {
	id: "cyberbiz",
	name: "CYBERBIZ",
	website: "https://www.cyberbiz.io",
	description: "CYBERBIZ is an ecommerce hosted solution based in Taiwan, offering cloud-based tools for setting up and managing online stores.",
	icon: "CYBERBIZ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cyberbiz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.cyberbiz\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cyberbiz:jsGlobal:1",
			kind: "jsGlobal",
			property: "CYBERBIZ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cyberbiz:jsGlobal:2",
			kind: "jsGlobal",
			property: "CYBERBIZ_AppScriptSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
