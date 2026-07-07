import type { TechnologyDefinition } from '../../types';

export const synologyDiskstationTechnologyDefinition = {
	id: "synology-diskstation",
	name: "Synology DiskStation",
	website: "https://synology.com",
	description: "DiskStation provides a full-featured network attached storage.",
	icon: "Synology DiskStation.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "synology-diskstation:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("webapi\\/entry\\.cgi\\?api=SYNO\\.(?:Core|Filestation)\\.Desktop\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "synology-diskstation:html:1",
			kind: "html",
			pattern: new RegExp("<noscript><div class='syno-no-script'"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "synology-diskstation:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("Synology DiskStation", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "synology-diskstation:meta:3",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("^DiskStation provides a full-featured network attached storage", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "synology-diskstation:dom:4",
			kind: "dom",
			selector: "noscript > div[class*='syno-no-script']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "synology-diskstation:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("webapi\\/entry\\.cgi\\?api=syno\\.(?:core|filestation)\\.desktop\\."),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "synology-diskstation:meta:6",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("synology diskstation", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "synology-diskstation:meta:7",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("^diskstation provides a full-featured network attached storage", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
