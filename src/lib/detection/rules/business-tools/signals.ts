import type { TechnologyDefinition } from '../../types';

export const signalsTechnologyDefinition = {
	id: "signals",
	name: "Signals",
	website: "https://getsignals.ai",
	description: "Signals is a cloud-based platform for managing employee pipelines, handling tickets, training new hires, and scaling recruiting operations.",
	icon: "Signals.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "signals:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getsignals\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "signals:jsGlobal:1",
			kind: "jsGlobal",
			property: "SignalsSDK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
