import type { TechnologyDefinition } from '../../types';

export const jqueryPjaxTechnologyDefinition = {
	id: "jquery-pjax",
	name: "jQuery-pjax",
	website: "https://github.com/defunkt/jquery-pjax",
	description: "jQuery PJAX is a plugin that uses AJAX and pushState.",
	categories: [
		"ui-library",
		"mobile",
	],
	rules: [
		{
			id: "jquery-pjax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]pjax(?:-([\\d.]))?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				template: "$1?$1:$2",
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-pjax:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+data-pjax-container"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "jquery-pjax:jsGlobal:2",
			kind: "jsGlobal",
			property: "jQuery.pjax",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-pjax:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]pjax(?:-([\\d.]+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-pjax:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("jquery[.-]pjax(?:-)?(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
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
