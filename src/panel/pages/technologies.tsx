import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import { Link } from '@tanstack/solid-router';
import { For, Show } from 'solid-js';

import { useTechnologies } from '@/panel/context';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Spinner } from '@/ui/spinner';

/** Primary extension view: technologies detected on the currently active tab. */
export function TechnologiesPage() {
	const technologies = useTechnologies();
	const count = () => technologies.analysis()?.results.length ?? 0;

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Current tab</p>
					<h1 class="k-page-title">Technologies</h1>
					<p class="k-page-description">
						{technologies.analysis()?.hostname ?? technologies.visibleTabIdentity()?.hostname ?? 'Open an HTTP or HTTPS page to inspect it.'}
					</p>
				</div>
				<Button
					variant="outline"
					size="icon-sm"
					aria-label="Refresh technology analysis"
					disabled={technologies.busy()}
					onClick={() => void technologies.refresh()}
				>
					<RefreshIcon />
				</Button>
			</header>

			<div class="flex flex-wrap items-center gap-2">
				<Badge>{count()} {count() === 1 ? 'technology' : 'technologies'}</Badge>
				<Show when={technologies.analysis()}>
					{(analysis) => <Badge variant="outline">{analysis().source}</Badge>}
				</Show>
				<Show when={technologies.liveUpdateMode() === 'active'}>
					<Badge variant="secondary">Observing</Badge>
				</Show>
			</div>

			<Show when={technologies.errorMessage()}>
				{(message) => (
					<Alert variant="destructive">
						<AlertTitle>Analysis failed</AlertTitle>
						<AlertDescription>{message()}</AlertDescription>
					</Alert>
				)}
			</Show>
			<Show when={technologies.notice()}>
				{(notice) => (
					<Alert>
						<AlertTitle>{notice().variant === 'success' ? 'Analysis updated' : 'Analysis status'}</AlertTitle>
						<AlertDescription>{notice().text}</AlertDescription>
					</Alert>
				)}
			</Show>

			<Show when={technologies.analysisActivity().busy}>
				<div class="panel-section flex items-start gap-3 p-3" role="status" aria-live="polite">
					<Spinner class="mt-0.5 size-4 text-kaiju-cyan" />
					<div>
						<p class="text-sm font-medium text-white">{technologies.analysisActivity().headline}</p>
						<p class="mt-1 text-xs leading-5 text-white/48">{technologies.analysisActivity().description}</p>
					</div>
				</div>
			</Show>

			<Show
				when={technologies.analysis()}
				fallback={(
					<Empty class="panel-section min-h-48 p-6">
						<EmptyHeader>
							<EmptyTitle>No site analysis yet</EmptyTitle>
							<EmptyDescription>Kaiju scans the active page when this panel opens or when you press Refresh.</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			>
				{(analysis) => (
					<Show
						when={analysis().results.length > 0}
						fallback={(
							<Empty class="panel-section min-h-48 p-6">
								<EmptyHeader>
									<EmptyTitle>No technologies detected</EmptyTitle>
									<EmptyDescription>The current evidence does not match a registry technology yet.</EmptyDescription>
								</EmptyHeader>
							</Empty>
						)}
					>
						<div class="grid gap-5">
							<For each={technologies.groupedResults()}>
								{(group) => (
									<section>
										<div class="k-category-heading">
											<h2 class="k-category-name">{group.label}</h2>
											<span class="k-category-count">{group.results.length}</span>
										</div>
										<div class="k-card-list">
											<For each={group.results}>
												{(result) => (
													<Link
														to="/technology/$technologyId"
														params={{ technologyId: result.technologyId }}
														class="k-tech-row"
													>
														<div class="k-tech-icon" aria-hidden="true">{result.name.slice(0, 1).toUpperCase()}</div>
														<div class="min-w-0 flex-1">
															<div class="flex min-w-0 items-center gap-2">
																<p class="k-tech-title">{result.name}</p>
																<Show when={technologies.lateAddedIds().includes(result.technologyId)}>
																	<Badge variant="outline">New</Badge>
																</Show>
															</div>
															<div class="k-tech-meta">
																<Show when={result.version}><span>v{result.version}</span></Show>
																<span>{result.evidence.length} {result.evidence.length === 1 ? 'signal' : 'signals'}</span>
																<span>{result.confidence.level}</span>
															</div>
														</div>
													</Link>
												)}
											</For>
										</div>
									</section>
								)}
							</For>
						</div>
					</Show>
				)}
			</Show>
		</>
	);
}
