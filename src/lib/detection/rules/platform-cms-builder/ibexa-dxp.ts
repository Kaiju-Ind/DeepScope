import type { TechnologyDefinition } from '../../types';

export const ibexaDxpTechnologyDefinition = {
	id: "ibexa-dxp",
	name: "Ibexa DXP",
	website: "https://www.ibexa.co",
	description: "Ibexa DXP is an open-source enterprise PHP content management system (CMS) and Digital Experience Platform (DXP) developed by the company Ibexa (known previously as eZ Systems).",
	icon: "Ibexa.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ibexa-dxp:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Ibexa\\sExperience\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ibexa-dxp:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^eZ Platform", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ibexa-dxp:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^ibexa\\sexperience\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ibexa-dxp:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ez platform", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	implies: [
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
