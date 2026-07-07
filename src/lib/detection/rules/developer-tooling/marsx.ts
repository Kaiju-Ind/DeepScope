import type { TechnologyDefinition } from '../../types';

export const marsxTechnologyDefinition = {
	id: "marsx",
	name: "MarsX",
	website: "https://www.marsx.dev",
	description: "MarsX is an AI-powered coding platform designed to develop Software as a Service (SaaS) tools.",
	icon: "MarsX.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "marsx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytic-api\\.marsx\\.dev\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
