import type { TechnologyDefinition } from '../../types';

export const apereoCasTechnologyDefinition = {
	id: "apereo-cas",
	name: "Apereo CAS",
	website: "https://www.apereo.org/projects/cas",
	description: "Apereo CAS is an open and well-documented authentication protocol. The primary implementation of the protocol is an open-source Java server component by the same name hosted here, with support for a plethora of additional authentication protocols and features.",
	icon: "Apereo CAS.png",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "apereo-cas:html:0",
			kind: "html",
			pattern: new RegExp("CAS\\s*(?:[–-]|&ndash;)\\s*(?:Central Authentication Service|Service Central d['’]Authentification)", "i"),
			confidence: 95,
			description: "Document HTML contains the Apereo CAS title marker.",
		},
		{
			id: "apereo-cas:text:1",
			kind: "text",
			pattern: new RegExp("CAS – (?:Central Authentication Service|Service Central d'Authentification)"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
