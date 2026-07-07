import type { TechnologyDefinition } from '../../types';

export const marshalTechnologyDefinition = {
	id: "marshal",
	name: "Marshal",
	website: "https://usemarshal.co",
	description: "Marshal is a platform that ensures businesses achieve compliance and accessibility.",
	icon: "Marshal.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "marshal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.usemarshal\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
