import type { TechnologyDefinition } from '../../types';

export const godaddyGoTechnologyDefinition = {
	id: "godaddy-go",
	name: "GoDaddy Go",
	website: "https://github.com/godaddy-wordpress/go",
	description: "GoDaddy Go is a flexible Gutenberg-first WordPress theme built for go-getters everywhere.",
	icon: "GoDaddy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "godaddy-go:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/go\\/.+frontend\\.min\\.js(?:.+ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "godaddy-go:dom:1",
			kind: "dom",
			selector: "link#go-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "godaddy-go:jsGlobal:2",
			kind: "jsGlobal",
			property: "goFrontend.openMenuOnHover",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
