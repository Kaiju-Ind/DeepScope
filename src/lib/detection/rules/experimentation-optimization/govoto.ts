import type { TechnologyDefinition } from '../../types';

export const govotoTechnologyDefinition = {
	id: "govoto",
	name: "GoVoto",
	website: "https://www.govoto.com",
	description: "GoVoto is a platform that improves website performance through conversion rate optimization, increasing the likelihood that visitors complete desired actions and become customers.",
	icon: "GoVoto.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "govoto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.govoto\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
