import type { TechnologyDefinition } from '../../types';

export const elcomTechnologyDefinition = {
	id: "elcom",
	name: "Elcom",
	website: "https://www.elcom.com.au/",
	description: "The Elcom Platform is a web content management and intranet portal software written in Microsoft ASP.NET and SQL Server by Elcom Technology.",
	icon: "elcom.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "elcom:text:0",
			kind: "text",
			pattern: new RegExp("Web CMS by Elcom"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "elcom:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^elcomCMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "elcom:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^elcomcms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
