import type { TechnologyDefinition } from '../../types';

export const spectroTechnologyDefinition = {
	id: "spectro",
	name: "Spectro",
	website: "https://myspectro.io",
	description: "Spectro is an ecommerce analytics and conversion optimisation tool that provides insights into customer behaviour and sales performance, helping businesses to improve their online strategies and increase conversions.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "spectro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracking\\.myspectro\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
