import type { TechnologyDefinition } from '../../types';

export const societeDesAvisGarantisTechnologyDefinition = {
	id: "societe-des-avis-garantis",
	name: "Societe des Avis Garantis",
	website: "https://www.societe-des-avis-garantis.fr",
	description: "Societe des Avis Garantis is a French company that provides customer review and rating services for businesses through its online platform.",
	icon: "Societe des Avis Garantis.svg",
	categories: [
		"wordpress-ecosystem",
		"community-ugc",
	],
	rules: [
		{
			id: "societe-des-avis-garantis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/ag-core\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "societe-des-avis-garantis:jsGlobal:1",
			kind: "jsGlobal",
			property: "agVanillaCode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "societe-des-avis-garantis:jsGlobal:2",
			kind: "jsGlobal",
			property: "urlCertificate",
			valuePattern: new RegExp("\\.societe-des-avis-garantis\\.fr\\/"),
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
