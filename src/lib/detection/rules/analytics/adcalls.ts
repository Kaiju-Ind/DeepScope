import type { TechnologyDefinition } from '../../types';

export const adcallsTechnologyDefinition = {
	id: "adcalls",
	name: "AdCalls",
	website: "https://adcalls.com",
	description: "AdCalls is a call tracking software designed to monitor and analyze inbound and outbound calls for performance and attribution.",
	icon: "AdCalls.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "adcalls:dom:0",
			kind: "dom",
			selector: "link[href*='.adcalls.nl']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adcalls:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.adcalls\\.nl", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "adcalls:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.adcalls\\.nl", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
