import type { TechnologyDefinition } from '../../types';

export const reactiveTechnologyDefinition = {
	id: "reactive",
	name: "Reactive",
	website: "https://reactiveonline.io",
	description: "Reactive is a subscription-based software that allows you to set up an online store and website. It has a CMS and has been created to support retail, coffee bars, restaurants owners and accomodation properties such as hotels or villas. With Reactive one can sell products or accept reservations and online orders.",
	icon: "Reactive.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "reactive:url:0",
			kind: "url",
			pattern: new RegExp("^https?\\/\\/.+\\.reactiveonline\\.io"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "reactive:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Reactive", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "reactive:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("reactive", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
