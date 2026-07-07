import type { TechnologyDefinition } from '../../types';

export const tumblrTechnologyDefinition = {
	id: "tumblr",
	name: "Tumblr",
	website: "https://www.tumblr.com",
	description: "Tumblr is a microblogging and social networking website. The service allows users to post multimedia and other content to a short-form blog.",
	icon: "Tumblr.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "tumblr:html:0",
			kind: "html",
			pattern: new RegExp("<iframe src=\"[^>]+tumblr\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "tumblr:url:1",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?[^/]+\\.tumblr\\.com\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "tumblr:dom:2",
			kind: "dom",
			selector: "iframe[src*='tumblr.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
