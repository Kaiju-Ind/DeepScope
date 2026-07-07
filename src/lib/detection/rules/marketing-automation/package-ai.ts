import type { TechnologyDefinition } from '../../types';

export const packageAiTechnologyDefinition = {
	id: "package-ai",
	name: "Package.AI",
	website: "https://package.ai",
	description: "Package. AI is a unified platform for last-mile and customer engagement, leveraging AI to enhance service delivery.",
	icon: "PackageAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "package-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.package\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
