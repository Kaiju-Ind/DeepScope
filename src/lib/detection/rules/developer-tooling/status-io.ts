import type { TechnologyDefinition } from '../../types';

export const statusIoTechnologyDefinition = {
	id: "status-io",
	name: "Status.io",
	website: "https://status.io",
	description: "Status.io is a hosted system status page manager with features such as customised incident tracking, subscriber notifications, and more.",
	icon: "Status.io.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "status-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.status\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
