import type { TechnologyDefinition } from '../../types';

export const louTechnologyDefinition = {
	id: "lou",
	name: "LOU",
	website: "https://www.louassist.com",
	description: "LOU is a Digital Adoption Platform that streamlines user onboarding and training.",
	icon: "LOU.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lou:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.louassist\\.com*"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
