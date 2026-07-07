import type { TechnologyDefinition } from '../../types';

export const drupalCommerceTechnologyDefinition = {
	id: "drupal-commerce",
	name: "Drupal Commerce",
	website: "https://drupalcommerce.org",
	description: "Drupal Commerce is open-source ecommerce software that augments the content management system Drupal.",
	icon: "Drupal Commerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "drupal-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/modules\\/(?:contrib\\/)?commerce\\/js\\/conditions\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drupal-commerce:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/profiles\\/commerce_kickstart\\/modules\\/contrib\\/commerce\\/modules\\/checkout\\/commerce_checkout\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drupal-commerce:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sites\\/(?:all|default)\\/modules\\/(?:contrib\\/)?commerce\\/modules\\/checkout\\/commerce_checkout\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "drupal-commerce:html:3",
			kind: "html",
			pattern: new RegExp("<[^>]+(?:id=\"block[_-]commerce[_-]cart[_-]cart|class=\"commerce[_-]product[_-]field)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "drupal-commerce:dom:4",
			kind: "dom",
			selector: "aside#cart-offcanvas, form.commerce-order-item-add-to-cart-form,form.commerce-add-to-cart",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:commerceguys:commerce:*:*:*:*:*:*:*:*",
	},
	implies: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
