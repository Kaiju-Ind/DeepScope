import type { TechnologyDefinition } from '../../types';

export const elogTechnologyDefinition = {
	id: "elog",
	name: "ELOG",
	website: "https://midas.psi.ch/elog",
	icon: "ELOG.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "elog:html:0",
			kind: "html",
			pattern: new RegExp("<title>ELOG Logbook Selection<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "elog:html:1",
			kind: "html",
			pattern: new RegExp("<title>elog logbook selection<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
