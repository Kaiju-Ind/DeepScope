import type { TechnologyDefinition } from '../../types';

export const jqueryPopupOverlayTechnologyDefinition = {
	id: "jquery-popup-overlay",
	name: "jQuery Popup Overlay",
	website: "https://www.npmjs.com/package/jquery-popup-overlay",
	description: "jQuery Popup Overlay is a responsive overlay which lets you create modal windows, tooltips, and more.",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "jquery-popup-overlay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(\\d+\\.\\d+\\.\\d+)\\/jquery\\.popupoverlay\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
