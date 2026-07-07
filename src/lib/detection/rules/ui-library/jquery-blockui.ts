import type { TechnologyDefinition } from '../../types';

export const jqueryBlockuiTechnologyDefinition = {
	id: "jquery-blockui",
	name: "jQuery BlockUI",
	website: "https://jquery.malsup.com/block",
	description: "jQuery BlockUI is a plugin that simulates synchronous behavior in AJAX by temporarily blocking user interaction and adding DOM elements that visually indicate restricted activity until the block is removed.",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jquery-blockui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.blockUI\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-blockui:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.blockui\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
