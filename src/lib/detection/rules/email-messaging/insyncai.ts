import type { TechnologyDefinition } from '../../types';

export const insyncaiTechnologyDefinition = {
	id: "insyncai",
	name: "InSyncai",
	website: "https://www.insyncai.com",
	description: "InSyncai offers a conversational platform for enterprises to design and build chatbots having applications in customer support and services.",
	icon: "InSyncai.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "insyncai:dom:0",
			kind: "dom",
			selector: "iframe[src*='insync_iframe_webchat_js_prod'], iframe#insync-iframe",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
