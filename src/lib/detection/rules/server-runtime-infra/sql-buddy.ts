import type { TechnologyDefinition } from '../../types';

export const sqlBuddyTechnologyDefinition = {
	id: "sql-buddy",
	name: "SQL Buddy",
	website: "https://www.sqlbuddy.com",
	description: "SQL Buddy is an open-source web-based application written in PHP to handle the administration of MySQL and SQLite with the use of a Web browser.",
	icon: "SQL Buddy.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "sql-buddy:html:0",
			kind: "html",
			pattern: new RegExp("(?:<title>SQL Buddy<\\/title>|<[^>]+onclick=\"sideMainClick\\(\"home\\.php)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sql-buddy:html:1",
			kind: "html",
			pattern: new RegExp("(?:<title>sql buddy<\\/title>|<[^>]+onclick=\"sidemainclick\\(\"home\\.php)"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
