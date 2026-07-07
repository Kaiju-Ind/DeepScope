import type { TechnologyDefinition } from '../../types';

export const zendeskSunshineConversationsTechnologyDefinition = {
	id: "zendesk-sunshine-conversations",
	name: "Zendesk Sunshine Conversations",
	website: "https://www.zendesk.com/platform/conversations",
	description: "Zendesk Sunshine Conversations lets you share a single, continuous conversation with every team in your business. With a unified API and native connectors to popular business applications like Zendesk and Slack, everyone in your organization can get access to a single view of the customer conversation.",
	icon: "Zendesk.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zendesk-sunshine-conversations:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.smooch\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"zendesk",
	],
} as const satisfies TechnologyDefinition;
