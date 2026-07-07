import type { TechnologyDefinition } from '../../types';

export const phabricatorTechnologyDefinition = {
	id: "phabricator",
	name: "Phabricator",
	website: "https://phacility.com",
	description: "Phabricator is a suite of web-based software development collaboration tools, including the Differential code review tool, the Diffusion repository browser, the Herald change monitoring tool, the Maniphest bug tracker and the Phriction wiki. Phabricator integrates with Git, Mercurial, and Subversion.",
	icon: "Phabricator.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "phabricator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/phabricator\\/[a-f0-9]{8}\\/rsrc\\/js\\/phui\\/[a-z-]+\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "phabricator:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]+(?:class|id)=\"phabricator-"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phabricator:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^phsid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phacility:phabricator:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
