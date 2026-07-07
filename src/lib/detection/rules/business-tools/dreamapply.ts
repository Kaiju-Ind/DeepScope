import type { TechnologyDefinition } from '../../types';

export const dreamapplyTechnologyDefinition = {
	id: "dreamapply",
	name: "DreamApply",
	website: "https://dreamapply.com",
	description: "DreamApply is a specialised student application management system designed with and for education institutions.",
	icon: "DreamApply.png",
	categories: [
		"business-tools",
		"widgets-misc",
	],
	rules: [
		{
			id: "dreamapply:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.cdn\\.dreamapply\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"facebook-login",
		"google-sign-in",
		"linkedin-sign-in",
	],
} as const satisfies TechnologyDefinition;
