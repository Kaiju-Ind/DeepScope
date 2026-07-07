import type { TechnologyDefinition } from '../../types';

export const oculizmTechnologyDefinition = {
	id: "oculizm",
	name: "Oculizm",
	website: "https://oculizm.com",
	description: "Oculizm is a conversion optimization tool that utilizes user-generated content and customer reviews to enhance consumer trust for retailers, resulting in increased sales and engagement.",
	icon: "Oculizm.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "oculizm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.oculizm\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
