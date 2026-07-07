import type { TechnologyDefinition } from '../../types';

export const beameryTechnologyDefinition = {
	id: "beamery",
	name: "Beamery",
	website: "https://beamery.com",
	description: "Beamery is an AI platform that helps organizations transform their workforce by optimizing talent acquisition, development, and management through data-driven insights and automation.",
	icon: "Beamery.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "beamery:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.beamery\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "beamery:header:1",
			kind: "header",
			key: "Access-Control-Allow-Headers",
			valuePattern: new RegExp("^X-BEAMERY", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "beamery:header:2",
			kind: "header",
			key: "access-control-allow-headers",
			valuePattern: new RegExp("^x-beamery", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
