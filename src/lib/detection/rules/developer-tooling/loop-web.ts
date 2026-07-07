import type { TechnologyDefinition } from '../../types';

export const loopWebTechnologyDefinition = {
	id: "loop-web",
	name: "Loop Web",
	website: "https://www.loopweb.net",
	description: "Loop Web is a provider in web, internet, network, and design services. Their offerings encompass website design, SMS, VoIP&IVR, Type, hosting, VPS, and more.",
	icon: "Loop Web.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "loop-web:dom:0",
			kind: "dom",
			selector: "link[href*='.loopweb.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "loop-web:meta:1",
			kind: "meta",
			key: "id",
			valuePattern: new RegExp("LoopWeb", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "loop-web:meta:2",
			kind: "meta",
			key: "id",
			valuePattern: new RegExp("loopweb", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
