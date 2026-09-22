# Portfolio refresh — delivery notes

## Implementation

The supplied September 2026 brief is the authority for professional claims. Replaced the old dark, card-heavy mobile-only presentation with a warm neutral and forest-green editorial layout. Added a clear React Native/full-stack identity, attributed impact, four prioritized project narratives, a four-step OCR/AI sequence, grouped expertise, all supplied employment and education, and working contact actions. Native project disclosures and always-visible mobile navigation work without JavaScript.

Source is split into semantic HTML and CSS. The favicon and sharing artwork are original typography drawn with system fonts, not product screenshots. The actual PNG sharing asset is included. Canonical, Open Graph, Person JSON-LD, sitemap, and robots metadata are present. Legacy `#projects`/`#skills` fragments still resolve. No build pipeline or production dependency was added.

The MIT LICENSE, bundled legacy fonts, `.gitignore`, and editor files were preserved. The legacy font README refers to an unrelated blockchain application; the redesigned site does not use those fonts or claim blockchain experience. No CNAME or deployment workflow existed to preserve. Read-only Pages API inspection confirmed `main` + `/`, no custom domain, and branch-based publishing.

## Corrected public claims

- Updated 8+ years to the supplied 9+ years and replaced iOS/mobile-only positioning with Senior React Native & Full-Stack Engineer.
- Corrected conflicting Goally end dates (August 2025 / Present) to September 2026 and used the supplied role title.
- Replaced unsupported Kotlin, Zustand, Objective-C, broad Expo, offline-first, and speculative project technology claims with confirmed skills and contribution scope.
- Removed The Long Game’s “Unpublished” / “Private build” labels; linked matching live store listings.
- Added complete backend ownership for Goally and The Long Game; kept other Intagleo MERN contributions distinct from Pynwheel.
- Attributed the 37% analytics computation result to Goally and the 40% load-time / approximately 50% crash results to Intagleo. No app startup claim or per-product reassignment was introduced.
- Kept PaxAI proportionate: React and Node.js contribution to an AI evaluation platform, without platform ownership or methodology claims.
- Replaced the nonexistent README case-study path with real preview, editing, checking, and publishing instructions.

## External link checks — 22 September 2026

Direct GET requests followed redirects and read HTML page titles. All ten public link destinations returned HTTP 200, but LinkedIn returned a CAPTCHA rather than a profile. Store identity checks identify products, not authorship; contribution claims come from the supplied brief.

| Destination | Result |
| --- | --- |
| [Goally — App Store](https://apps.apple.com/pk/app/goally/id1262461227) | Goally listing matched. |
| [Goally — Google Play](https://play.google.com/store/apps/details?id=com.mygoally.mygoally) | Parent app identity matched; the learner-app listing was not substituted. |
| [The Long Game — App Store](https://apps.apple.com/us/app/the-long-game-healthspan/id6748027793) | The Long Game: Healthspan listing matched the supplied product description. |
| [The Long Game — Google Play](https://play.google.com/store/apps/details?id=com.thelonggame) | The Long Game: Healthspan listing matched. |
| [Pynwheel Self Tour — App Store](https://apps.apple.com/us/app/self-tour/id1488907392) | Existing URL redirects to `/us/app/pynwheel-tour/id1488907392`, titled Pynwheel Tour. Original working URL retained. |
| [Pynwheel Touch — Google Play](https://play.google.com/store/apps/details?id=com.pynwheel.touch) | Pynwheel Touch listing matched. |
| [FaithJourney](https://apps.apple.com/us/app/faithjourney/id1544431979) | Identity matched; existing link retained under More released work. |
| [Amal For Life](https://apps.apple.com/pk/app/amal-for-life/id1442826238) | Identity matched; existing link retained under More released work. |
| [GitHub](https://github.com/imranshad) | Profile title matched. |
| [LinkedIn](https://linkedin.com/in/imranshad) | HTTP 200 CAPTCHA; profile contents could not be verified. Existing URL preserved. |

Email and telephone links retain repository-supported destinations; no email was sent or call placed.

## Validation

- Chromium browser suite at 320, 375, 768, 1024, and 1440px: no detected horizontal overflow, missing anchors, missing local assets, duplicate IDs, or browser runtime errors.
- Keyboard navigation: skip link, visible focus, all four navigation links, and all native project disclosures; Enter opens disclosures and Space closes them.
- JavaScript disabled at 375px: native navigation, project disclosure interaction, and contact link are usable. The site includes only a JSON-LD data script.
- Reduced-motion preference: computed scrolling is `auto` at all five tested widths. Normal native scrolling is separately exercised in the no-JavaScript check.
- Metadata: one h1, canonical URL, parseable Person JSON-LD, actual social image, stylesheet, favicon, sitemap, and robots file.
- Desktop/mobile screenshots captured. Visually inspected desktop and mobile full-page images and full-resolution hero captures for hierarchy, spacing, and text wrapping.
- axe-core WCAG 2 A/AA and WCAG 2.1 AA checks at 375 and 1440px: zero reported violations. This is an automated audit, not a claim of complete accessibility certification.
- HTML validation uses recommended rules with formatting-only title/void/whitespace rules relaxed and redundant/native-role rules relaxed specifically to retain explicit list roles for Safari/VoiceOver markerless lists. No remaining validation messages.
- Source review caught and fixed skip-link hover contrast and markerless-list semantics. `git diff --check` passes.

Browser checks are reproducible with `scripts/check-site.cjs` and the README instructions. The initial test failed on the old page’s missing Work navigation. During no-JavaScript verification, the test harness needed Node-side polling for native smooth scrolling; page-side animation-frame polling cannot be relied on in that context. The page remained JavaScript-free.

At the initial review handoff, checks not performed included Lighthouse scoring, physical-device testing, manual screen-reader testing, Firefox/Safari browser runs, résumé download testing (no asset), email delivery, phone calls, or live deployment validation. There was no preexisting package test/build suite.

## Outstanding assets and delivery boundaries

- No relevant résumé exists; no download button is published.
- No public destination for the specific PaxAI evaluation platform was supplied or confidently identified. Its project panel intentionally has no external action.
- LinkedIn’s CAPTCHA prevented profile-content verification.
- macOS denied access to `/Users/developer/Documents/codex-agent`, so any local uncommitted work there could not be inspected. A clean clone of remote `main` at `04a69bc` was used on `codex/portfolio-refresh`. No inaccessible files were overwritten.
- The initial handoff included a reviewable local diff, a binary-capable patch, and a complete source archive, without changing the live site or remote branches. The owner subsequently approved publication through the existing `main` / root GitHub Pages workflow. Deployment status and commit evidence are reported in the delivery conversation.
