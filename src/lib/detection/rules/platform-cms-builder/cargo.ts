import type { TechnologyDefinition } from '../../types';

export const cargoTechnologyDefinition = {
	id: "cargo",
	name: "Cargo",
	website: "https://cargo.site",
	description: "Cargo is a professional site building platform for designers and artists.",
	icon: "Cargo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cargo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cargo\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cargo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cargo.Config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cargo:jsGlobal:2",
			kind: "jsGlobal",
			property: "__cargo_js_ver__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cargo:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("(?<!elo\\.io)\\/cargo\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cargo:dom:4",
			kind: "dom",
			selector: "link[href*='build.cargo.site/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cargo:jsGlobal:5",
			kind: "jsGlobal",
			property: "CargoEditor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
