import type { TechnologyDefinition } from '../../types';

export const webadministratorCmsTechnologyDefinition = {
	id: "webadministrator-cms",
	name: "WebAdministrator CMS",
	website: "https://www.jskinternet.pl/jsk/oferta/webadministrator-cms/",
	description: "WebAdministrator CMS is a content management system used heavily by Polish public institutions.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webadministrator-cms:html:0",
			kind: "html",
			pattern: new RegExp("<!-- [\\d\\.]+ \\/ WebAdministrator \\(\\d{2}.\\d{2}\\.\\d{4} \\d{2}:\\d{2}\\) \\/\\/-->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "webadministrator-cms:html:1",
			kind: "html",
			pattern: new RegExp("<!-- [\\d\\.]+ \\/ webadministrator \\(\\d{2}.\\d{2}\\.\\d{4} \\d{2}:\\d{2}\\) \\/\\/-->"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
