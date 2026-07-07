import type { TechnologyDefinition } from '../../types';

export const rallyTechnologyDefinition = {
	id: "rally",
	name: "Rally",
	website: "https://www.rallyonline.co",
	description: "Rally is a CMS designed for K-12 schools, enabling the development of websites and apps.",
	icon: "Rally.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rally:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.rallycms\\.ca"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
