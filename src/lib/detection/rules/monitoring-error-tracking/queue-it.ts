import type { TechnologyDefinition } from '../../types';

export const queueItTechnologyDefinition = {
	id: "queue-it",
	name: "Queue-it",
	website: "https://queue-it.com",
	description: "Queue-it is a virtual waiting room platform designed to protect your website and mobile app from slowdowns or crashes during end-user peaks.",
	icon: "Queue-it.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "queue-it:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.queue-it\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "queue-it:jsGlobal:1",
			kind: "jsGlobal",
			property: "QueueIt.Javascript.Version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "queue-it:jsGlobal:2",
			kind: "jsGlobal",
			property: "queueit_clientside_config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
