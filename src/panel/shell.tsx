import { Link, useLocation } from '@tanstack/solid-router';
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';

import { Badge } from '@/ui/badge';
import { Spinner } from '@/ui/spinner';

export type PanelRootProps = {
	readonly children: JSX.Element;
	readonly busy: boolean;
	readonly hostname?: string;
};

const navigation = [
	{ to: '/', label: 'Technologies' },
	{ to: '/scans', label: 'Scans' },
	{ to: '/diagnostics', label: 'Diagnostics' },
	{ to: '/settings', label: 'Settings' },
] as const;

/** Persistent chrome around routed side-panel pages. */
export function PanelShell(props: PanelRootProps) {
	const location = useLocation();
	const isActive = (to: (typeof navigation)[number]['to']) =>
		to === '/' ? location().pathname === '/' || location().pathname.startsWith('/technology/') : location().pathname === to;

	return (
		<div class="k-panel-shell" aria-busy={props.busy ? 'true' : 'false'}>
			<header class="k-panel-header">
				<div class="k-panel-brand">
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-2">
							<p class="flex min-w-0 items-baseline gap-2">
								<span class="font-logo text-2xl leading-none text-white">Kaiju</span>
								<span class="truncate font-display text-xs font-medium text-white/48">Site Scope</span>
							</p>
							<Show when={props.busy}>
								<Badge variant="outline" class="gap-1.5">
									<Spinner class="size-3" />
									Scanning
								</Badge>
							</Show>
						</div>
						<p class="k-panel-host">{props.hostname ?? 'No inspectable tab'}</p>
					</div>
				</div>

				<nav class="k-panel-nav" aria-label="Kaiju Site Scope pages">
					{navigation.map((item) => (
						<Link
							to={item.to}
							class="k-panel-nav-link"
							data-active={isActive(item.to) ? 'true' : 'false'}
							aria-current={isActive(item.to) ? 'page' : undefined}
						>
							{item.label}
						</Link>
					))}
				</nav>
			</header>
			<main class="k-panel-main">{props.children}</main>
		</div>
	);
}
