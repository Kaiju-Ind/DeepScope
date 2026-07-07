import type { TechnologyDefinition } from '../../types';

export const bizspringTechnologyDefinition = {
	id: "bizspring",
	name: "BizSpring",
	website: "https://bizspring.co.kr",
	description: "BizSpring is a data analytics platform focused on understanding online customer behavior and analyzing marketing data for business insights.",
	icon: "BizSpring.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "bizspring:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fs\\.bizspring\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
