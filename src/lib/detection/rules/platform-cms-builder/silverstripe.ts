import type { TechnologyDefinition } from '../../types';

export const silverstripeTechnologyDefinition = {
	id: "silverstripe",
	name: "Silverstripe",
	website: "https://www.silverstripe.org/",
	description: "Silverstripe CMS is a free and open source Content Management System and Framework for creating and maintaining websites and web applications.",
	icon: "SilverStripe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "silverstripe:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+SilverStripe"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "silverstripe:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SilverStripe", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "silverstripe:html:2",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+Silverstripe"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "silverstripe:html:3",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+silverstripe"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "silverstripe:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^silverstripe", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:silverstripe:silverstripe:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
