import type { TechnologyDefinition } from '../../types';

export const openchatTechnologyDefinition = {
	id: "openchat",
	name: "OpenChat",
	website: "https://oc.app",
	description: "OpenChat is a community-owned chat application designed to prioritize privacy, security, and anonymity.",
	icon: "OpenChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "openchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cloud\\.openchat\\.so"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
