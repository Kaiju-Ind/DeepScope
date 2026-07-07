import type { TechnologyDefinition } from '../../types';

export const ajaxNetProfessionalTechnologyDefinition = {
	id: "ajax-net-professional",
	name: "Ajax.NET Professional",
	website: "https://github.com/michaelschwarz/Ajax.NET-Professional",
	description: "Ajax. NET Professional is a legacy framework that generates JavaScript proxies to call. NET server-side methods via AJAX.",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "ajax-net-professional:jsGlobal:0",
			kind: "jsGlobal",
			property: "AjaxPro",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ajax-net-professional:jsGlobal:1",
			kind: "jsGlobal",
			property: "AjaxPro.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
