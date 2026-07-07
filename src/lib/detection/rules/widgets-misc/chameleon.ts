import type { TechnologyDefinition } from '../../types';

export const chameleonTechnologyDefinition = {
	id: "chameleon",
	name: "Chameleon",
	website: "https://www.trychameleon.com",
	description: "Chameleon is a sophisticated no-code platform for product success, empowering SaaS teams to build self-service user onboarding, feature adoption, and feedback collection.",
	icon: "Chameleon.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "chameleon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trychameleon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chameleon:jsGlobal:1",
			kind: "jsGlobal",
			property: "chmln.Snippet.urls.fast",
			valuePattern: new RegExp("fast\\.trychameleon\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chameleon:jsGlobal:2",
			kind: "jsGlobal",
			property: "chmlnData.organizationAttributes",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
