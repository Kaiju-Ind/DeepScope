import type { TechnologyDefinition } from '../../types';

export const googlePagespeedTechnologyDefinition = {
	id: "google-pagespeed",
	name: "Google PageSpeed",
	website: "https://developers.google.com/speed/pagespeed/mod",
	description: "Google PageSpeed is a family of tools designed to help websites performance optimisations.",
	icon: "Google PageSpeed.svg",
	categories: [
		"server-runtime-infra",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "google-pagespeed:header:0",
			kind: "header",
			key: "X-Mod-Pagespeed",
			valuePattern: new RegExp("([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "google-pagespeed:header:1",
			kind: "header",
			key: "X-Page-Speed",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "google-pagespeed:header:2",
			kind: "header",
			key: "x-mod-pagespeed",
			valuePattern: new RegExp("([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "google-pagespeed:header:3",
			kind: "header",
			key: "x-page-speed",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
