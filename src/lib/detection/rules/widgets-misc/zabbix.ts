import type { TechnologyDefinition } from '../../types';

export const zabbixTechnologyDefinition = {
	id: "zabbix",
	name: "Zabbix",
	website: "https://zabbix.com",
	description: "Zabbix is an open-source monitoring tool that provides real-time monitoring, alerting, and reporting for IT infrastructure, including networks, servers, and applications.",
	icon: "Zabbix.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "zabbix:html:0",
			kind: "html",
			pattern: new RegExp("<body[^>]+zbxCallPostScripts"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "zabbix:url:1",
			kind: "url",
			pattern: new RegExp("\\/zabbix\\/"),
			confidence: 30,
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "zabbix:jsGlobal:2",
			kind: "jsGlobal",
			property: "zbxCallPostScripts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zabbix:meta:3",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("ZABBIX SIA", "i"),
			confidence: 70,
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zabbix:html:4",
			kind: "html",
			pattern: new RegExp("<body[^>]+zbxcallpostscripts"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "zabbix:meta:5",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("zabbix sia", "i"),
			confidence: 70,
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:zabbix:zabbix:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
