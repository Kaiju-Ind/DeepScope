import type { TechnologyDefinition } from '../../types';

export const microsoftPublisherTechnologyDefinition = {
	id: "microsoft-publisher",
	name: "Microsoft Publisher",
	website: "https://office.microsoft.com/publisher",
	description: "Microsoft Publisher is an application that allows you to create professional documents such as newsletters, postcards, flyers, invitations, brochures.",
	icon: "Microsoft Publisher.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "microsoft-publisher:html:0",
			kind: "html",
			pattern: new RegExp("(?:<html [^>]*xmlns:w=\"urn:schemas-microsoft-com:office:publisher\"|<!--[if pub]><xml>)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-publisher:meta:1",
			kind: "meta",
			key: "ProgId",
			valuePattern: new RegExp("^Publisher\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-publisher:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Microsoft Publisher( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-publisher:dom:3",
			kind: "dom",
			selector: "html[xmlns\\:w='urn:schemas-microsoft-com:office:publisher']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microsoft-publisher:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("microsoft publisher( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-publisher:meta:5",
			kind: "meta",
			key: "progid",
			valuePattern: new RegExp("^publisher\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:publisher:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
