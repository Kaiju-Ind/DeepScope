import type { TechnologyDefinition } from '../../types';

export const typo3CmsTechnologyDefinition = {
	id: "typo3-cms",
	name: "TYPO3 CMS",
	website: "https://typo3.org/",
	description: "TYPO3 is a free and open-source Web content management system written in PHP.",
	icon: "TYPO3.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "typo3-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/?typo3(?:conf|temp)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "typo3-cms:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+ href=\"\\/?typo3(?:conf|temp)\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "typo3-cms:html:2",
			kind: "html",
			pattern: new RegExp("<img[^>]+ src=\"\\/?typo3(?:conf|temp)\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "typo3-cms:html:3",
			kind: "html",
			pattern: new RegExp("<!--\\n\tThis website is powered by TYPO3"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "typo3-cms:url:4",
			kind: "url",
			pattern: new RegExp("\\/typo3\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "typo3-cms:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("TYPO3\\s+(?:CMS\\s+)?(?:[\\d.]+)?(?:\\s+CMS)?", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "typo3-cms:dom:6",
			kind: "dom",
			selector: "link[href*='typo3conf'], link[href*='typo3temp'], img[src*='typo3conf'], img[src*='typo3temp']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "typo3-cms:jsGlobal:7",
			kind: "jsGlobal",
			property: "webpackChunkTYPO3Webpack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "typo3-cms:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("typo3\\s+(?:cms\\s+)?(?:[\\d.]+)?(?:\\s+cms)?", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:typo3:typo3:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
