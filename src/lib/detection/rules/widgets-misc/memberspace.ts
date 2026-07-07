import type { TechnologyDefinition } from '../../types';

export const memberspaceTechnologyDefinition = {
	id: "memberspace",
	name: "MemberSpace",
	website: "https://www.memberspace.com",
	description: "MemberSpace is a cloud-based membership solution, which allows users to provide role-based access to content.",
	icon: "MemberSpace.svg",
	categories: [
		"widgets-misc",
		"commerce-operations",
	],
	rules: [
		{
			id: "memberspace:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("memberspace\\.com(?:\\/widget)?(?:\\/\\w{0,25})?(?:\\/scripts)?(?:\\/widgets)?(?:\\/main)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "memberspace:jsGlobal:1",
			kind: "jsGlobal",
			property: "MemberSpace",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "memberspace:jsGlobal:2",
			kind: "jsGlobal",
			property: "MemberSpaceParams",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
