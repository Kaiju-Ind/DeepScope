import type { TechnologyDefinition } from '../../types';

export const embedthisAppwebTechnologyDefinition = {
	id: "embedthis-appweb",
	name: "EmbedThis Appweb",
	website: "https://embedthis.com/appweb",
	description: "Appweb is an embeddable web server for applications and devices.",
	icon: "Embedthis.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "embedthis-appweb:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Mbedthis-Appweb(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "embedthis-appweb:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mbedthis-appweb(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:embedthis:appweb:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
