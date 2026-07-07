import type { TechnologyDefinition } from '../../types';

export const influxCmsTechnologyDefinition = {
	id: "influx-cms",
	name: "Influx CMS",
	website: "https://www.influxmarketing.com",
	description: "Influx CMS is a medical marketing platform specialising in custom web design and marketing for doctors, surgeons, and medical spas.",
	icon: "InfluxCMS.svg",
	categories: [
		"platform-cms-builder",
		"marketing-automation",
	],
	rules: [
		{
			id: "influx-cms:dom:0",
			kind: "dom",
			selector: "a[href*='www.influxmarketing.com'] > svg[class*='influx-footer-logo']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "influx-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Influx CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "influx-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^influx cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "influx-cms:dom:3",
			kind: "dom",
			selector: "a[href*='www.influxmarketing.com'] > svg[class*='influx-footer-logo'",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"gatsby",
		"react",
	],
} as const satisfies TechnologyDefinition;
