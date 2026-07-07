import type { TechnologyDefinition } from '../../types';

export const smarthintTechnologyDefinition = {
	id: "smarthint",
	name: "SmartHint",
	website: "https://www.smarthint.co",
	description: "SmartHint is an ecommerce recommendation system that uses customer behavior data to suggest relevant products and improve shopping experience.",
	icon: "SmartLink.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "smarthint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service\\.smarthint\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smarthint:jsGlobal:1",
			kind: "jsGlobal",
			property: "countInitSmartHint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "smarthint:jsGlobal:2",
			kind: "jsGlobal",
			property: "smarthintkey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
