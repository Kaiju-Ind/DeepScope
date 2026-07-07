import type { TechnologyDefinition } from '../../types';

export const memberstackTechnologyDefinition = {
	id: "memberstack",
	name: "MemberStack",
	website: "https://www.memberstack.io",
	description: "MemberStack is a no-code membership platform for Webflow.",
	icon: "MemberStack.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "memberstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("memberstack\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "memberstack:url:1",
			kind: "url",
			pattern: new RegExp("^https?\\/\\/.+\\.memberstack\\.io"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "memberstack:jsGlobal:2",
			kind: "jsGlobal",
			property: "MemberStack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "memberstack:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^memberstack$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
