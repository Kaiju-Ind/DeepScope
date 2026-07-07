import type { TechnologyDefinition } from '../../types';

export const jqueryMobileTechnologyDefinition = {
	id: "jquery-mobile",
	name: "jQuery Mobile",
	website: "https://jquerymobile.com",
	description: "jQuery Mobile is an HTML5-based user interface system designed to make responsive web sites and apps that are accessible on all smartphone, tablet and desktop devices.",
	icon: "jQuery Mobile.svg",
	categories: [
		"ui-library",
		"mobile",
	],
	rules: [
		{
			id: "jquery-mobile:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]mobile(?:-([\\d.]))?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				template: "$1?$1:$2",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-mobile:jsGlobal:1",
			kind: "jsGlobal",
			property: "jQuery.mobile.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-mobile:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]mobile(?:-([\\d.]+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-mobile:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]mobile(?:-)?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
