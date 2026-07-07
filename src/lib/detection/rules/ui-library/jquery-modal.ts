import type { TechnologyDefinition } from '../../types';

export const jqueryModalTechnologyDefinition = {
	id: "jquery-modal",
	name: "jQuery Modal",
	website: "https://jquerymodal.com",
	description: "JQuery Modal is an overlay dialog box or in other words, a popup window that is made to display on the top or 'overlayed' on the current page.",
	icon: "jQuery Modal.png",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jquery-modal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery-modal\\/([\\d\\.]+)\\/jquery\\.modal\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jquery-modal:dom:1",
			kind: "dom",
			selector: "link[href*='jquery.modal.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
