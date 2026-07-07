import type { TechnologyDefinition } from '../../types';

export const flipshopTechnologyDefinition = {
	id: "flipshop",
	name: "Flipshop",
	website: "https://www.flipshop.co",
	description: "Flipshop is a platform that enables the creation of online stores for businesses.",
	icon: "Flipshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flipshop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("(?:\\.flipshop\\.co|ans-flipshop\\.s3)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
