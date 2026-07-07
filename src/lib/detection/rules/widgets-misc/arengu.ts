import type { TechnologyDefinition } from '../../types';

export const arenguTechnologyDefinition = {
	id: "arengu",
	name: "Arengu",
	website: "https://www.arengu.com",
	description: "Arengu is an online form builder designed to streamline user onboarding.",
	icon: "Arengu.svg",
	categories: [
		"widgets-misc",
		"surveys-feedback",
	],
	rules: [
		{
			id: "arengu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.arengu\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
