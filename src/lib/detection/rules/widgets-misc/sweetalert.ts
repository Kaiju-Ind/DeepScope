import type { TechnologyDefinition } from '../../types';

export const sweetalertTechnologyDefinition = {
	id: "sweetalert",
	name: "SweetAlert",
	website: "https://sweetalert.js.org",
	description: "SweetAlert is a JavaScript library that provides alternative alert and modal dialog boxes for web applications, with customisable features, aiming to improve the user interface of the default browser dialogs.",
	icon: "SweetAlert.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sweetalert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sweet(?:-)?alert(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sweetalert:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+?href=\"[^\"]+sweet-alert(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sweetalert:dom:2",
			kind: "dom",
			selector: "link[href*='sweet-alert']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
