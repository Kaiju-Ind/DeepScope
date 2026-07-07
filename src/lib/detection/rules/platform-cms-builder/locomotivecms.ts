import type { TechnologyDefinition } from '../../types';

export const locomotivecmsTechnologyDefinition = {
	id: "locomotivecms",
	name: "LocomotiveCMS",
	website: "https://www.locomotivecms.com",
	description: "LocomotiveCMS is a Ruby on Rails-based content management system (CMS) known for its flexibility and developer-friendly approach to building and managing websites.",
	icon: "LocomotiveCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "locomotivecms:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]*\\/sites\\/[a-z\\d]{24}\\/theme\\/stylesheets"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "locomotivecms:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.locomotive\\.works\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"mongodb",
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
