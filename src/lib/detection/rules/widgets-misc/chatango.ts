import type { TechnologyDefinition } from '../../types';

export const chatangoTechnologyDefinition = {
	id: "chatango",
	name: "Chatango",
	website: "https://chatango.com",
	description: "Chatango is a website used for connecting to a large selection of users.",
	icon: "Chatango.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "chatango:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("st\\.chatango\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatango:dom:1",
			kind: "dom",
			selector: "iframe[src*='st.chatango.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
