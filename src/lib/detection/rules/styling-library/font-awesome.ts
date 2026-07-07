import type { TechnologyDefinition } from '../../types';

export const fontAwesomeTechnologyDefinition = {
	id: "font-awesome",
	name: "Font Awesome",
	website: "https://fontawesome.com/",
	description: "Font Awesome is a font and icon toolkit based on CSS and Less.",
	icon: "Font Awesome.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "font-awesome:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:F|f)o(?:n|r)t-?(?:A|a)wesome(?:.*?([0-9a-fA-F]{7,40}|[\\d]+(?:.[\\d]+(?:.[\\d]+)?)?)|)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "font-awesome:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fontawesome\\.com\\/([0-9a-z]+).js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "font-awesome:dom:2",
			kind: "dom",
			selector: "link[href*='awesome']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "font-awesome:dom:3",
			kind: "dom",
			selector: "link[href*='font-awesome']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "font-awesome:dom:4",
			kind: "dom",
			selector: "link[href*='fontawesome-free']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "font-awesome:dom:5",
			kind: "dom",
			selector: "link[href*='kit-pro.fontawesome.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "font-awesome:jsGlobal:6",
			kind: "jsGlobal",
			property: "FontAwesomeCdnConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "font-awesome:jsGlobal:7",
			kind: "jsGlobal",
			property: "___FONT_AWESOME___",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "font-awesome:dom:8",
			kind: "dom",
			selector: "[data-fa-i2svg], svg[data-prefix][data-icon], .fa, .fas, .far, .fal, .fab, .fad, [class^='fa-'], [class*=' fa-']",
			description: "DOM contains Font Awesome class tokens or SVG metadata.",
		},
		{
			id: "font-awesome:jsGlobal:9",
			kind: "jsGlobal",
			property: "FontAwesomeKitConfig.asyncLoading",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "font-awesome:scriptSrc:10",
			kind: "scriptSrc",
			pattern: new RegExp("(?:f|f)o(?:n|r)t-?(?:a|a)wesome(?:.*?([0-9a-fa-f]{7,40}|[\\d]+(?:.[\\d]+(?:.[\\d]+)?)?)|)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
