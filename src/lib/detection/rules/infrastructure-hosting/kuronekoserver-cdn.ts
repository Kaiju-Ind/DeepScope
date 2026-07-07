import type { TechnologyDefinition } from '../../types';

export const kuronekoserverCdnTechnologyDefinition = {
	id: "kuronekoserver-cdn",
	name: "KuronekoServer CDN",
	website: "https://cdn.krnk.org",
	description: "KuronekoServer CDN is a distributed content delivery network utilizing VPS and Cloudflare to enhance performance and reliability.",
	icon: "KuronekoServerCDN.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "kuronekoserver-cdn:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.krnk\\.org\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kuronekoserver-cdn:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.krnk.org/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
