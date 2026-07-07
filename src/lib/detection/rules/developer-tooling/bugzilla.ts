import type { TechnologyDefinition } from '../../types';

export const bugzillaTechnologyDefinition = {
	id: "bugzilla",
	name: "Bugzilla",
	website: "https://www.bugzilla.org",
	description: "Bugzilla is an open-source bug and issue tracking system.",
	icon: "Bugzilla.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "bugzilla:html:0",
			kind: "html",
			pattern: new RegExp("href=\"enter_bug\\.cgi\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bugzilla:html:1",
			kind: "html",
			pattern: new RegExp("<main id=\"bugzilla-body\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bugzilla:html:2",
			kind: "html",
			pattern: new RegExp("<a href=\"https?:\\/\\/www\\.bugzilla\\.org\\/docs\\/([0-9.]+)\\/[^>]+>Help<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bugzilla:html:3",
			kind: "html",
			pattern: new RegExp("<span id=\"information\" class=\"header_addl_info\">version ([\\d.]+)<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bugzilla:jsGlobal:4",
			kind: "jsGlobal",
			property: "BUGZILLA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bugzilla:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^Bugzilla_login_request_cookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bugzilla:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Bugzilla ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bugzilla:dom:7",
			kind: "dom",
			selector: "main[id*='bugzilla-body']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bugzilla:dom:8",
			kind: "dom",
			selector: "span[id*='information'][class*='header_addl_info']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bugzilla:html:9",
			kind: "html",
			pattern: new RegExp("<a href=\"https?:\\/\\/www\\.bugzilla\\.org\\/docs\\/([0-9.]+)\\/[^>]+>help<"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "bugzilla:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^bugzilla_login_request_cookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bugzilla:meta:11",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("bugzilla ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bugzilla:dom:12",
			kind: "dom",
			selector: "main[id*='bugzilla-body'], span[id*='information'][class*='header_addl_info']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:mozilla:bugzilla:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
