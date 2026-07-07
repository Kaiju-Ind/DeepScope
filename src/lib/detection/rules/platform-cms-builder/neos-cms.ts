import type { TechnologyDefinition } from '../../types';

export const neosCmsTechnologyDefinition = {
	id: "neos-cms",
	name: "Neos CMS",
	website: "https://neos.io",
	icon: "Neos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "neos-cms:url:0",
			kind: "url",
			pattern: new RegExp("\\/neos\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "neos-cms:header:1",
			kind: "header",
			key: "X-Flow-Powered",
			valuePattern: new RegExp("Neos\\/?(.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "neos-cms:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Neos\\.Neos\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "neos-cms:header:3",
			kind: "header",
			key: "x-flow-powered",
			valuePattern: new RegExp("neos\\/?(.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:neos:neos_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"neos-flow",
	],
	excludes: [
		"typo3-cms",
	],
} as const satisfies TechnologyDefinition;
