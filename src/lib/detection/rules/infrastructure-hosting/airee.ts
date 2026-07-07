import type { TechnologyDefinition } from '../../types';

export const aireeTechnologyDefinition = {
	id: "airee",
	name: "Airee",
	website: "https://xn--80aqc2a.xn--p1ai",
	description: "Airee offers scalable web hosting solutions tailored for internet shops and websites, with enhanced performance, DDoS protection, high availability, and detailed speed and security analytics.",
	icon: "Airee.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "airee:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Airee", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "airee:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^airee", "i"),
			description: "Response header matches a known technology marker.",
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
