import type { TechnologyDefinition } from '../../types';

export const zozoTechnologyDefinition = {
	id: "zozo",
	name: "Zozo",
	website: "https://zozo.vn",
	description: "Zozo is a multi-channel ecommerce services provider from Vietnam.",
	icon: "Zozo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zozo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zozo-main\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zozo:dom:1",
			kind: "dom",
			selector: "a[href*='/zozo.vn/'][href*='footerurl'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zozo:text:2",
			kind: "text",
			pattern: new RegExp("^Zozo"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "zozo:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Zozo Ecommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zozo:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("zozo ecommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"mysql",
		"php",
	],
	excludes: [
		"opencart",
	],
} as const satisfies TechnologyDefinition;
