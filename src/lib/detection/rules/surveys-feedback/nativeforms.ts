import type { TechnologyDefinition } from '../../types';

export const nativeformsTechnologyDefinition = {
	id: "nativeforms",
	name: "NativeForms",
	website: "https://nativeforms.com",
	description: "NativeForms is a tool for creating forms, surveys, and polls across various platforms.",
	icon: "NativeForms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "nativeforms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.nativeforms\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
