import type { TechnologyDefinition } from '../../types';

export const orocommerceTechnologyDefinition = {
	id: "orocommerce",
	name: "OroCommerce",
	website: "https://oroinc.com",
	description: "OroCommerce is an open-source B2B ecommerce platform designed to meet the needs of B2B companies, offering features like advanced product management, customer segmentation, and complex pricing structures.",
	icon: "orocommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "orocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("oro\\.min\\.js\\?version=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "orocommerce:html:1",
			kind: "html",
			pattern: new RegExp("<script [^>]+data-requiremodule=\"oro\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "orocommerce:html:2",
			kind: "html",
			pattern: new RegExp("<script [^>]+data-requiremodule=\"oroui\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "orocommerce:dom:3",
			kind: "dom",
			selector: "script[data-requiremodule^='oro/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "orocommerce:dom:4",
			kind: "dom",
			selector: "script[data-requiremodule^='oroui/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "orocommerce:dom:5",
			kind: "dom",
			selector: "script[src*='/oroui.js']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "orocommerce:dom:6",
			kind: "dom",
			selector: "body[data-bound-view^='oroui/js/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "orocommerce:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^orosfid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "orocommerce:dom:8",
			kind: "dom",
			selector: "script[data-requiremodule^='oro/'], script[data-requiremodule^='oroui/'], script[src*='/oroui.js'], body[data-bound-view^='oroui/js/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:oroinc:orocommerce:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
