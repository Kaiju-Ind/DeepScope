import type { TechnologyDefinition } from '../../types';

export const easypollsTechnologyDefinition = {
	id: "easypolls",
	name: "EasyPolls",
	website: "https://easypolls.net",
	description: "EasyPolls is a tool that allows poll creation and sharing across websites, Facebook, Twitter, or via a direct link to the poll, enabling users to engage audiences across multiple platforms.",
	icon: "EasyPolls.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "easypolls:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.easypolls\\.net"),
			description: "Script source URL matches a known technology marker.",
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
