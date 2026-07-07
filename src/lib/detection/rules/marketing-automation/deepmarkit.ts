import type { TechnologyDefinition } from '../../types';

export const deepmarkitTechnologyDefinition = {
	id: "deepmarkit",
	name: "DeepMarkit",
	website: "https://www.deepmarkit.com",
	description: "Deepmarkit is a customer acquisition platform designed to help businesses attract, engage, and convert potential clients through targeted digital marketing and promotional campaigns.",
	icon: "DeepMarkit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "deepmarkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("portal\\.deepmarkit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
