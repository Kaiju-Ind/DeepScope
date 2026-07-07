import type { TechnologyDefinition } from '../../types';

export const xverifyTechnologyDefinition = {
	id: "xverify",
	name: "Xverify",
	website: "https://www.xverify.com",
	description: "Xverify is an intelligent email verification system that helps marketers eliminate hard bounces, reduce spam complaints, and minimize fraud to improve inbox deliverability.",
	icon: "Xverify.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "xverify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.xverify\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xverify:jsGlobal:1",
			kind: "jsGlobal",
			property: "user_xverify_my_domain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
