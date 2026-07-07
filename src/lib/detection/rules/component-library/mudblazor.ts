import type { TechnologyDefinition } from '../../types';

export const mudblazorTechnologyDefinition = {
	id: "mudblazor",
	name: "MudBlazor",
	website: "https://mudblazor.com/",
	description: "MudBlazor is a component library for Blazor implementing Material Design.",
	icon: "Mudblazor.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "mudblazor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("_content\\/MudBlazor\\/MudBlazor\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mudblazor:dom:1",
			kind: "dom",
			selector: "link[href*='/MudBlazor.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mudblazor:jsGlobal:2",
			kind: "jsGlobal",
			property: "mudWindow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mudblazor:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("_content\\/mudblazor\\/mudblazor\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"blazor",
	],
} as const satisfies TechnologyDefinition;
