# Safari and App Store Connect

**Owner actions (one time).** An Apple Developer Program membership and team, a real bundle id ending in `.DeepScope`
(the packager derives the extension id from it), distribution signing, and, for automation, an App Store Connect API key.
Set `ASC_PACKAGE=true` and `SAFARI_BUNDLE_ID` for the `app-store-connect` job. Automated signing and upload are not
implemented; the owner archives, signs and uploads from Xcode.

**Procedure.** `mise run build safari`, then `mise run safari-project` on macOS wraps `.output/safari-mv3` in an Xcode
project with `xcrun safari-web-extension-packager` and builds it unsigned. The Release workflow's `app-store-connect` job
produces the same project as a workflow artifact.

**Local verification needs one-time settings** on the Mac that runs it: Safari > Settings > Advanced > "Show features for
web developers", then Settings > Developer > "Allow remote automation" (or `safaridriver --enable`, which asks for an
admin password). An unsigned build also needs Develop > "Allow Unsigned Extensions", which resets each time Safari quits,
and DeepScope enabled with website access in Settings > Extensions. Safari 26 can install an extension through
WebDriver's classic command; BiDi `webExtension.install` is not implemented (WebKit bug 288348). `mise run verify safari`
exits with code 2 and names the missing step. See [`tools/verify/README.md`](../../../tools/verify/README.md).

**Evidence.** Safari version, whether the run used Safari or Safari Technology Preview, the scenario results, and the
Xcode build log. **Invalidated by** a new Safari release, a manifest change or a bundle id change.
