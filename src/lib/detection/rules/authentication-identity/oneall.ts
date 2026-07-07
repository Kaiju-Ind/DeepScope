import type { TechnologyDefinition } from '../../types';

export const oneallTechnologyDefinition = {
	id: "oneall",
	name: "OneAll",
	website: "https://www.oneall.com",
	description: "OneAll is a social login solution enables your users to sign into their accounts on your website or mobile app using their login details from networking sites.",
	icon: "OneAll.png",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "oneall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.oneall\\.com\\/socialize"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oneall:jsGlobal:1",
			kind: "jsGlobal",
			property: "oa_social_login",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
