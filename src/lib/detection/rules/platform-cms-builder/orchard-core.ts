import type { TechnologyDefinition } from '../../types';

export const orchardCoreTechnologyDefinition = {
	id: "orchard-core",
	name: "Orchard Core",
	website: "https://orchardcore.net",
	description: "Orchard Core is an open-source modular and multi-tenant application framework built with ASP.NET Core, and a content management system (CMS).",
	icon: "Orchard Core.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "orchard-core:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/OrchardCore\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "orchard-core:header:1",
			kind: "header",
			key: "x-generator",
			valuePattern: new RegExp("^Orchard$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orchard-core:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("OrchardCore", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orchard-core:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Orchard", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "orchard-core:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/orchardcore\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "orchard-core:header:5",
			kind: "header",
			key: "x-generator",
			valuePattern: new RegExp("^orchard$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orchard-core:header:6",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("orchardcore", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orchard-core:meta:7",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("orchard", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:orchardcore:orchard_core:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
