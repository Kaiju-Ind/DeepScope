import type { TechnologyDefinition } from '../../types';

export const qpienTechnologyDefinition = {
	id: "qpien",
	name: "Qpien",
	website: "https://qpien.com",
	description: "Qpien is a SaaS platform that provides multi-channel customer communication management with AI reply automation, smart inbox, call center integration, and workflow orchestration.",
	icon: "Qpien.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "qpien:jsGlobal:0",
			kind: "jsGlobal",
			property: "QpienWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qpien:jsGlobal:1",
			kind: "jsGlobal",
			property: "qpienIframeAction",
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
