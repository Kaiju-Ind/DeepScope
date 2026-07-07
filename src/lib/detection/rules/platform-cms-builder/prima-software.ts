import type { TechnologyDefinition } from '../../types';

export const primaSoftwareTechnologyDefinition = {
	id: "prima-software",
	name: "Prima Software",
	website: "https://www.primasoftware.co.uk",
	description: "Prime Software is an ecommerce platform designed for the office supplies market.",
	icon: "PrimaSoftware.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "prima-software:jsGlobal:0",
			kind: "jsGlobal",
			property: "prima.address",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prima-software:jsGlobal:1",
			kind: "jsGlobal",
			property: "prima_module_load",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prima-software:meta:2",
			kind: "meta",
			key: "DCTERMS.publisher",
			valuePattern: new RegExp("^Prima Software Ltd$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "prima-software:meta:3",
			kind: "meta",
			key: "dcterms.publisher",
			valuePattern: new RegExp("^prima software ltd$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
