import type { TechnologyDefinition } from '../../types';

export const wordfenceTechnologyDefinition = {
	id: "wordfence",
	name: "Wordfence",
	website: "https://www.wordfence.com",
	description: "Wordfence is a security plugin for sites that use WordPress. Wordfence includes an endpoint firewall and malware scanner.",
	icon: "Wordfence.svg",
	categories: [
		"wordpress-ecosystem",
		"security",
	],
	rules: [
		{
			id: "wordfence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wordfence\\/.+admin\\.ajaxWatcher\\.\\d+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wordfence:jsGlobal:1",
			kind: "jsGlobal",
			property: "wordfenceAJAXWatcher",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wordfence:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wordfence\\/.+admin\\.ajaxwatcher\\.\\d+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:wordfence:wordfence:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
