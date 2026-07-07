import type { TechnologyDefinition } from '../../types';

export const jqueryDevbridgeAutocompleteTechnologyDefinition = {
	id: "jquery-devbridge-autocomplete",
	name: "jQuery DevBridge Autocomplete",
	website: "https://www.devbridge.com/sourcery/components/jquery-autocomplete/",
	description: "Ajax Autocomplete for jQuery allows you to easily create autocomplete/autosuggest boxes for text input fields.",
	icon: "jQuery.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jquery-devbridge-autocomplete:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/devbridgeAutocomplete(?:-min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-devbridge-autocomplete:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.devbridge-autocomplete\\/([0-9.]+)\\/jquery\\.autocomplete(?:.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-devbridge-autocomplete:jsGlobal:2",
			kind: "jsGlobal",
			property: "$.devbridgeAutocomplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-devbridge-autocomplete:jsGlobal:3",
			kind: "jsGlobal",
			property: "jQuery.devbridgeAutocomplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jquery-devbridge-autocomplete:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/devbridgeautocomplete(?:-min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
