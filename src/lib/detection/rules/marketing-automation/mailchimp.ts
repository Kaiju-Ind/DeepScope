import type { TechnologyDefinition } from '../../types';

export const mailchimpTechnologyDefinition = {
	id: "mailchimp",
	name: "MailChimp",
	website: "https://mailchimp.com",
	description: "Mailchimp is a marketing automation platform and email marketing service.",
	icon: "mailchimp.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "mailchimp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s3\\.amazonaws\\.com\\/downloads\\.mailchimp\\.com\\/js\\/mc-validate\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailchimp:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-images\\.mailchimp\\.com\\/[^>]*\\.css"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailchimp:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("chimpstatic\\.com\\/mcjs-connected"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailchimp:html:3",
			kind: "html",
			pattern: new RegExp("<form [^>]*data-mailchimp-url"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mailchimp:html:4",
			kind: "html",
			pattern: new RegExp("<form [^>]*id=\"mc-embedded-subscribe-form\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mailchimp:html:5",
			kind: "html",
			pattern: new RegExp("<form [^>]*name=\"mc-embedded-subscribe-form\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mailchimp:html:6",
			kind: "html",
			pattern: new RegExp("<input [^>]*id=\"mc-email\""),
			confidence: 20,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mailchimp:html:7",
			kind: "html",
			pattern: new RegExp("<!-- Begin MailChimp Signup Form -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mailchimp:dns:8",
			kind: "dns",
			valuePattern: new RegExp("spf\\.mandrillapp\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "mailchimp:url:9",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:www\\.)?mailchi\\.mp"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "mailchimp:dom:10",
			kind: "dom",
			selector: "form#mc-embedded-subscribe-form",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailchimp:dom:11",
			kind: "dom",
			selector: "form[name*='mc-embedded-subscribe-form']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailchimp:dom:12",
			kind: "dom",
			selector: "form[class*='mailchimp-ext-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailchimp:dom:13",
			kind: "dom",
			selector: "input#mc-email",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailchimp:dom:14",
			kind: "dom",
			selector: "form#mc-embedded-subscribe-form, form[name*='mc-embedded-subscribe-form']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mailchimp:html:15",
			kind: "html",
			pattern: new RegExp("<!-- begin mailchimp signup form -->"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:thinkshout:mailchimp:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
