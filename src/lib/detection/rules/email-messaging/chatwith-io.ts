import type { TechnologyDefinition } from '../../types';

export const chatwithIoTechnologyDefinition = {
	id: "chatwith-io",
	name: "ChatWith.io",
	website: "https://chatwith.io",
	description: "ChatWith.io is a versatile platform enabling WhatsApp link management, statistics tracking, and specialised services like WhatsApp Business Dating and widgets for efficient customer engagement.",
	icon: "ChatWith.io.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatwith-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.tochat\\.be\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatwith-io:dom:1",
			kind: "dom",
			selector: "a[href*='//chatwith.io/'][target='_self']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
