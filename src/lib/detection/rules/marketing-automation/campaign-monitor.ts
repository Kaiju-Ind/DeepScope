import type { TechnologyDefinition } from '../../types';

export const campaignMonitorTechnologyDefinition = {
	id: "campaign-monitor",
	name: "Campaign Monitor",
	website: "https://www.campaignmonitor.com",
	description: "Campaign Monitor is a global technology company that provides an email marketing platform.",
	icon: "Campaign Monitor.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "campaign-monitor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.createsend1\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "campaign-monitor:dom:1",
			kind: "dom",
			selector: "input[value='campaignmonitor_subscribe_form'][name='form_id'], form[action*='createsend'][class='js-cm-form']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
