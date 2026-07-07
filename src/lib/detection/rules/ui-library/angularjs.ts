import type { TechnologyDefinition } from '../../types';

export const angularjsTechnologyDefinition = {
	id: "angularjs",
	name: "AngularJS",
	website: "https://angularjs.org",
	description: "AngularJS is a JavaScript-based open-source web application framework led by the Angular Team at Google.",
	icon: "AngularJS.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "angularjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("angular[.-]([\\d.]*\\d)[^/]*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "angularjs:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/([\\d.]+(?:-?rc[.\\d]*)*)\\/angular(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "angularjs:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("(?!angular\\.io)\\bangular.{0,32}\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "angularjs:html:3",
			kind: "html",
			pattern: new RegExp("<(?:div|html)[^>]+ng-app="),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "angularjs:html:4",
			kind: "html",
			pattern: new RegExp("<ng-app"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "angularjs:jsGlobal:5",
			kind: "jsGlobal",
			property: "angular",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "angularjs:jsGlobal:6",
			kind: "jsGlobal",
			property: "angular.version.full",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:angularjs:angular.js:*:*:*:*:*:*:*:*",
	},
	excludes: [
		"angular",
		"angulardart",
	],
} as const satisfies TechnologyDefinition;
