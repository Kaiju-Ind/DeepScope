import type { TechnologyDefinition } from '../../types';

export const adwosCmsTechnologyDefinition = {
	id: "adwos-cms",
	name: "Adwos CMS",
	website: "https://adwos.org",
	description: "Adwos CMS is a turnkey CMS for classified ads, marketplaces and rental services. Go 1.24 backend + Next.js 16 frontend, PostgreSQL 16, Redis. Self-hosted, one-time license per domain.",
	icon: "Adwos CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adwos-cms:html:0",
			kind: "html",
			pattern: new RegExp("<meta[^>]+property=\"og:site_name\"[^>]+content=\"Adwos CMS\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adwos-cms:html:1",
			kind: "html",
			pattern: new RegExp("<meta[^>]+name=\"adwos:powered-by\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adwos-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Adwos CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "adwos-cms:meta:3",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Adwos CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: false,
		pricing: [
			"low",
			"onetime",
		],
	},
	implies: [
		"go",
		"next-js",
		"postgresql",
		"redis",
	],
} as const satisfies TechnologyDefinition;
