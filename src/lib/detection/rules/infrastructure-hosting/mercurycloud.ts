import type { TechnologyDefinition } from '../../types';

export const mercurycloudTechnologyDefinition = {
	id: "mercurycloud",
	name: "Mercurycloud",
	website: "https://mercurycloud.fr",
	description: "Mercurycloud is a hosting service provider offering a range of solutions, including web hosting, virtual private servers (VPS), dedicated servers, and game servers.",
	icon: "Mercurycloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "mercurycloud:header:0",
			kind: "header",
			key: "X-Host",
			valuePattern: new RegExp("\\.mercurycloud\\.fr", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mercurycloud:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("MercuryCloud CDN v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mercurycloud:header:2",
			kind: "header",
			key: "x-host",
			valuePattern: new RegExp("\\.mercurycloud\\.fr", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mercurycloud:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("mercurycloud cdn v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
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
