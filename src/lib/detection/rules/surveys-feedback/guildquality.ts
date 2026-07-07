import type { TechnologyDefinition } from '../../types';

export const guildqualityTechnologyDefinition = {
	id: "guildquality",
	name: "GuildQuality",
	website: "https://www.guildquality.com",
	description: "GuildQuality is a customer satisfaction surveying and performance reporting platform that collects feedback, measures service quality, and provides structured insights for operational improvement.",
	icon: "GuildQuality.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "guildquality:dom:0",
			kind: "dom",
			selector: "iframe[src*='guildquality.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "guildquality:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("www\\.guildquality\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "guildquality:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("www\\.guildquality\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
