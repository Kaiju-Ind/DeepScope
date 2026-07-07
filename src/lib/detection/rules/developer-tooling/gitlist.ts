import type { TechnologyDefinition } from '../../types';

export const gitlistTechnologyDefinition = {
	id: "gitlist",
	name: "gitlist",
	website: "https://gitlist.org",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gitlist:html:0",
			kind: "html",
			pattern: new RegExp("<p>Powered by <a[^>]+>GitList ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitlist:html:1",
			kind: "html",
			pattern: new RegExp("<p>powered by <a[^>]+>gitlist ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:gitlist:gitlist:*:*:*:*:*:*:*:*",
	},
	implies: [
		"git",
		"php",
	],
} as const satisfies TechnologyDefinition;
