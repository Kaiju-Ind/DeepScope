import type { TechnologyDefinition } from '../../types';

export const mageworxSearchAutocompleteTechnologyDefinition = {
	id: "mageworx-search-autocomplete",
	name: "MageWorx Search Autocomplete",
	website: "https://github.com/mageworx/search-suite-autocomplete",
	description: "MageWorx Search Autocomplete extension offers an AJAX-based popup window that displays and updates relevant search results while a customer forms his or her query.",
	icon: "MageWorx.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "mageworx-search-autocomplete:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("MageWorx_SearchSuiteAutocomplete"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mageworx-search-autocomplete:dom:1",
			kind: "dom",
			selector: "link[href*='MageWorx_SearchSuiteAutocomplete']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mageworx-search-autocomplete:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("mageworx_searchsuiteautocomplete"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"magento",
	],
} as const satisfies TechnologyDefinition;
