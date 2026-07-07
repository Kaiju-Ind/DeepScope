import type { TechnologyDefinition } from '../../types';

export const ackeeTechnologyDefinition = {
	id: "ackee",
	name: "Ackee",
	website: "https://ackee.electerious.com",
	description: "Ackee is a self-hosted, Node.js based analytics tool with a focus on privacy.",
	icon: "Ackee.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ackee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ackee-tracker(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ackee:dom:1",
			kind: "dom",
			selector: "[data-ackee-domain-id], [data-ackee-server]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ackee:jsGlobal:2",
			kind: "jsGlobal",
			property: "ackeeTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
