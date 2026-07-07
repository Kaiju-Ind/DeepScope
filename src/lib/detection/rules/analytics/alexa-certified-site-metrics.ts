import type { TechnologyDefinition } from '../../types';

export const alexaCertifiedSiteMetricsTechnologyDefinition = {
	id: "alexa-certified-site-metrics",
	name: "Alexa Certified Site Metrics",
	website: "https://support.alexa.com/hc/en-us/sections/200063374",
	description: "Alexa Certified Site Metrics is an analytics service wich monitors and analyses web traffic and can be used to keep track of user behavior.",
	icon: "Alexa.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "alexa-certified-site-metrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudfront\\.net\\/atrk\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alexa-certified-site-metrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "_atrk_opts.domain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
