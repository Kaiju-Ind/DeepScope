import type { TechnologyDefinition } from '../../types';

export const ocstoreTechnologyDefinition = {
	id: "ocstore",
	name: "ocStore",
	website: "https://ocstore.com",
	description: "ocStore is an online store based on Opencart and open-source.",
	icon: "ocStore.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ocstore:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+ocStore(?:\\s([\\d\\.a-z]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ocstore:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+ocstore(?:\\s([\\d\\.a-z]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"opencart",
	],
} as const satisfies TechnologyDefinition;
