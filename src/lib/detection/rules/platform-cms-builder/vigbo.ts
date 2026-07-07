import type { TechnologyDefinition } from '../../types';

export const vigboTechnologyDefinition = {
	id: "vigbo",
	name: "Vigbo",
	website: "https://vigbo.com",
	description: "Vigbo is a platform for building and managing websites and web applications with a focus on user-friendly design and minimal coding.",
	icon: "vigbo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vigbo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.vigbo\\.com|\\.gophotoweb\\.com)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vigbo:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]+(?:\\.vigbo\\.com|\\.gophotoweb\\.com)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "vigbo:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_gphw_mode$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vigbo:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:vigbo|gophotoweb)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vigbo:dom:4",
			kind: "dom",
			selector: "link[href*='.vigbo.com'], link[href*='.gophotoweb.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
