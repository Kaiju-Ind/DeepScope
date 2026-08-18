import BugIcon from '~icons/fluent/bug-24-regular';
import HistoryIcon from '~icons/fluent/history-24-regular';
import HomeIcon from '~icons/fluent/home-24-regular';
import MoreIcon from '~icons/fluent/more-horizontal-24-regular';
import SettingsIcon from '~icons/fluent/settings-24-regular';
import TechnologyIcon from '~icons/fluent/apps-24-regular';
import { createMediaQuery } from '@solid-primitives/media';
import { Link, useLocation } from '@tanstack/solid-router';
import type { Component, JSX } from 'solid-js';
import { For, Show, createSignal } from 'solid-js';

import { Badge } from '@/ui/badge';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/ui/drawer';
import { Spinner } from '@/ui/spinner';

export type PanelShellProps = {
	readonly children: JSX.Element;
	readonly busy: boolean;
	readonly hostname?: string;
};

type PrimaryNavigationItem = {
	readonly to: '/' | '/technologies' | '/history';
	readonly label: string;
	readonly icon: Component<JSX.SvgSVGAttributes<SVGSVGElement>>;
};

const primaryNavigation: readonly PrimaryNavigationItem[] = [
	{ to: '/', label: 'Summary', icon: HomeIcon },
	{ to: '/technologies', label: 'Tech', icon: TechnologyIcon },
	{ to: '/history', label: 'History', icon: HistoryIcon },
];

/** Persistent chrome around routed side-panel pages. */
export function PanelShell(props: PanelShellProps) {
	const location = useLocation();
	const touch = createMediaQuery('(pointer: coarse), (hover: none)');
	const [moreOpen, setMoreOpen] = createSignal(false);
	const isActive = (to: PrimaryNavigationItem['to']) => {
		if (to === '/technologies') return location().pathname === to || location().pathname.startsWith('/technology/');
		return location().pathname === to;
	};
	const moreActive = () => location().pathname === '/diagnostics' || location().pathname === '/settings';

	return (
		<div class="k-panel-shell" aria-busy={props.busy ? 'true' : 'false'}>
			<header class="k-panel-header">
				<div class="k-panel-brand">
					<div class="min-w-0 flex-1">
						<div class="flex items-center gap-3">
							<p class="inline-flex min-w-0 items-center gap-3 text-white">
								<span class="rounded font-logo text-2xl leading-none text-white">Kaiju</span>
								<span class="rounded-md bg-kaiju-cyan/10 px-2 py-1 font-display text-lg font-semibold tracking-tight text-kaiju-cyan">DeepScope</span>
							</p>
							<Show when={props.busy}>
								<Badge variant="outline" class="ml-auto gap-1.5">
									<Spinner class="size-3" />
									Inspecting
								</Badge>
							</Show>
						</div>
						<p class="k-panel-host">{props.hostname ?? 'No inspectable tab'}</p>
					</div>
				</div>

				<nav class="k-panel-nav k-panel-nav-top" aria-label="DeepScope pages">
					<For each={primaryNavigation}>{(item) => <NavigationLink item={item} active={isActive(item.to)} />}</For>
					<button type="button" class="k-panel-nav-link" data-active={moreActive() ? 'true' : 'false'} onClick={() => setMoreOpen(true)}>
						<MoreIcon class="size-4" aria-hidden="true" />
						More
					</button>
				</nav>
			</header>

			<main class="k-panel-main">{props.children}</main>

			<nav class="k-panel-bottom-nav" aria-label="DeepScope pages">
				<For each={primaryNavigation}>{(item) => <NavigationLink item={item} active={isActive(item.to)} bottom />}</For>
				<button type="button" class="k-panel-bottom-link" data-active={moreActive() ? 'true' : 'false'} onClick={() => setMoreOpen(true)}>
					<MoreIcon class="size-5" aria-hidden="true" />
					<span>More</span>
				</button>
			</nav>

			<Drawer open={moreOpen()} onOpenChange={setMoreOpen} side={touch() ? 'bottom' : 'right'}>
				<DrawerContent class="border-white/10 bg-kaiju-navy-deep text-white">
					<DrawerHeader>
						<DrawerTitle>More</DrawerTitle>
						<DrawerDescription>Support, settings, and extension information.</DrawerDescription>
					</DrawerHeader>
					<div class="grid gap-2 p-4 pt-0">
						<Link to="/diagnostics" class="k-more-link" onClick={() => setMoreOpen(false)}>
							<BugIcon class="size-5 text-kaiju-cyan" aria-hidden="true" />
							<div><p class="text-sm font-medium text-white">Diagnostics</p><p class="mt-0.5 text-xs text-white/42">Investigate failures, jobs, contexts, and logs.</p></div>
						</Link>
						<Link to="/settings" class="k-more-link" onClick={() => setMoreOpen(false)}>
							<SettingsIcon class="size-5 text-kaiju-cyan" aria-hidden="true" />
							<div><p class="text-sm font-medium text-white">Settings</p><p class="mt-0.5 text-xs text-white/42">Automatic inspection and local data controls.</p></div>
						</Link>
						<div class="k-more-link cursor-default">
							<div class="grid size-5 place-items-center rounded bg-kaiju-cyan/10 font-mono text-[0.625rem] text-kaiju-cyan">i</div>
							<div><p class="text-sm font-medium text-white">DeepScope 0.1.0</p><p class="mt-0.5 text-xs text-white/42">Local browser technology inspection by Kaiju.</p></div>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

/** Render one primary route in top or touch-oriented bottom navigation. */
function NavigationLink(props: { readonly item: PrimaryNavigationItem; readonly active: boolean; readonly bottom?: boolean }) {
	const Icon = props.item.icon;
	return (
		<Link
			to={props.item.to}
			class={props.bottom ? 'k-panel-bottom-link' : 'k-panel-nav-link'}
			data-active={props.active ? 'true' : 'false'}
			aria-current={props.active ? 'page' : undefined}
		>
			<Icon class={props.bottom ? 'size-5' : 'size-4'} aria-hidden="true" />
			<span>{props.item.label}</span>
		</Link>
	);
}
