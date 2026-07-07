import type { TechnologyDefinition } from '../../types';

export const yunohostTechnologyDefinition = {
	id: "yunohost",
	name: "YunoHost",
	website: "https://yunohost.org",
	description: "YunoHost is a server operating system that is free and open-source, allowing users to host their own web applications, email services, and other online tools. It is based on Debian GNU/Linux.",
	icon: "YunoHost.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "yunohost:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ynh_portal\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:o:yunohost:yunohost:*:*:*:*:*:*:*:*",
	},
	implies: [
		"debian",
	],
} as const satisfies TechnologyDefinition;
