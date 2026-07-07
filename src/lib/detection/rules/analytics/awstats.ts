import type { TechnologyDefinition } from '../../types';

export const awstatsTechnologyDefinition = {
	id: "awstats",
	name: "AWStats",
	website: "https://awstats.sourceforge.net",
	description: "AWStats is an open-source log analyzer that reports traffic for web, mail, FTP, and streaming servers.",
	icon: "AWStats.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "awstats:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("AWStats ([\\d.]+(?: \\(build [\\d.]+\\))?)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "awstats:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:^|\\/)awstats_misc_tracker\\.js(?:\\?|$)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "awstats:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("awstats ([\\d.]+(?: \\(build [\\d.]+\\))?)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:laurent_destailleur:awstats:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
