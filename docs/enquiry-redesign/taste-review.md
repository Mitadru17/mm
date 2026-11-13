GATE: OPEN 71 (rounds used up)

# Taste review and verification limits

Taste plugin 2.5.1 is installed and enabled. Three real checker rounds ran on the local production preview. No waivers were added and the checker was not modified. This is an open diagnostic result, not a Taste pass.

Useful findings corrected during the review: small-text contrast, header/footer target heights, unused font preload, stronger photo-card keyboard focus, clearer image numbering and full-opacity location copy.

The remaining report includes conventions that conflict with the existing client brief: full-bleed collages, the over-photo header, the requested perspective carousel, the shared welcome/loader heading, editorial type scales, the existing map and verified international phone number. The footer deliberately uses hairline divisions and a centred photo/text composition. The heading-focus rules target programmatically focused, non-interactive headings; interactive controls retain visible focus. Those are not silently counted as a passing grade.

Material limits still recorded: two inherited low-resolution arrival/surroundings crops; a conservative contrast sample over the animated location photograph; automatic focus/contrast judgements on image cards. Physical iOS/Safari, actual email delivery and field frame rates were not certified. The custom flow tests prove the implemented enquiry, not every broader site quality criterion.

The applied skill is [SKILL.md](C:/Users/loser/.codex/plugins/cache/taste-skill/taste-skill/2.5.1/skills/taste-skill/SKILL.md). Its finish instruction states: "At the last round the gate says once rounds used up: stop fixing, put the open FAILs in the report, finish." Its three-round limit has been reached. The requested footer, fonts, buttons and enquiry are implemented; broader diagnostic items are retained below for review.

Kind: place, an existing hotel in Kausani. Brand cream/pine retained from the client; the new approved typography is Bodoni Moda/Manrope. Existing arrival hero, genuine photos, carousel, map and scroll motion remain. No new effect, scene, generated image or assumed hotel detail was added. Voice: direct personal hospitality, plain form instructions, no availability or reply-time claim.

Build passed; eight booking/date unit tests passed; ten current browser-flow checks plus four targeted final checks passed with no uncaught browser errors. See qa.json and final-smoke.json. The email flow opens a real encoded draft or copies details; no message was sent and no reservation was confirmed.

All open findings follow. Exact machine state: taste-gate.json and taste-open-findings.json. Checker output: taste-gate-output.txt.

- flush — section#stay > a.jh-collage. its button sits 0px above the lower edge of section#stay, where the ground changes to section#nature
- flush — section#nature > a.jh-collage. its first line sits 0px under the top edge of section#nature, where the ground changes
- flush — section#dine > a.jh-collage. its first line sits 0px under the top edge of section#dine, where the ground changes
- flush — section#explore > a.jh-collage. its first line sits 0px under the top edge of section#explore, where the ground changes
- flush — section#unwind > a.jh-collage. its first line sits 0px under the top edge of section#unwind, where the ground changes
- nav — div#root > div.jh-site > header.jh-header. the nav has no bar, and its pieces sit past the content's edges (81-1389px against 238-1202px)
- no-visual — section#main "EXPERIENCE LIFE AT MYSTIC MOUNTAIN". no picture, effect or mock in this section; a feature section needs a visual
- no-visual — div#root > div.jh-site > main > section.jh-marquee "mountain air slower days". no picture, effect or mock in this section; a feature section needs a visual
- button-styles — (the page). 3 button styles on the page: soft, fill #2f4f3e, outline #2f4f3e x7 ("Find your mountain stay"); soft, outline #faf8f4 x1 ("Explore the 3D map"); soft, fill #e9e1d6, outline #e9e1d6 x1 ("Plan your mountain stay")
- cta — section#main. the hero has no button (the nav's does not count)
- cta — section#place "OUR LITTLE CORNER OF KUMAON". the last section before the footer ends with no button
- copy-headline — h1#arrival-title "Welcome home to the mountains.". "Welcome home to the mountains." does not name what is sold (hotel in kausani, hotel, kausani, from flags)
- copy-fact — h1#arrival-title "Welcome home to the mountains.". the first screen holds no number, price, date, place, platform or genre
- copy-headings — section#experiences > div.jh-experiences-heading > h2 "Little rituals, slower days.". "Little rituals, slower days." names no product, part, place or section (10 headings like it; at most one brand line per page) (and 9 more like it: "A STAY THAT FEELS LIKE Y", "A little space. A differ", "NATURE", "AROUND THE TABLE", ...)
- heading-scale — section#experiences > div.jh-experiences-heading > h2 "Little rituals, slower days.". an h2 at 67.7px, as large as the h1 (52px) or larger
- heading-scale — div.jh-experience-surface > a.jh-experience-card > div.jh-experience-label > h3 "Mountain mornings". an h3 at 36px, as large as the smallest h2 (11px) or larger (and 2 more like it: "Timber & light", "Around the table")
- tilt — div.jh-experiences-viewport > div.jh-experiences-track > article.jh-experience-slide:nth-of-type(1) > div.jh-experience-surface "01 / 06 Mountain mornings". turned in 3D (and 4 more like it: "03 / 06 Around the table", "04 / 06 Out in the open", "05 / 06 A quieter corner", "06 / 06 Let the outside ")
- section-gaps — section#main / section#experiences. 354px between these sections, +883% against the median 36px of gaps at a change of ground
- section-gaps — section#experiences / section#stay. 102px between these sections, +451% against the median 19px
- section-gaps — section#stay / section#nature. 1px between these sections, -95% against the median 19px
- section-gaps — section#nature / section#dine. 0px between these sections, -100% against the median 19px
- section-gaps — section#dine / section#explore. 0px between these sections, -100% against the median 19px
- section-gaps — section#explore / section#unwind. 0px between these sections, -100% against the median 19px
- section-gaps — section#unwind / div#root > div.jh-site > main > section.jh-marquee. 36px between these sections, +95% against the median 19px
- section-gaps — div#root > div.jh-site > main > section.jh-marquee / section#faq. 138px between these sections, +646% against the median 19px
- section-gaps — section#faq / section#place. 229px between these sections, +1138% against the median 19px
- photo-upscale — a.jh-collage > div.jh-collage-back > span.image-shell > img "img: Trees and hillside buildings beside". surroundings-960.webp: 734x550 shown at 828x1035, blown up 1.88x
- photo-upscale — a.jh-collage > div.jh-collage-front > span.image-shell > img "img: Curving Baijnath Road and roadside ". arrival-480.webp: 230x172 shown at 216x270, blown up 1.57x
- effect-kind — (the page). a place page (--type) moves with the scroll: scroll libraries or timelines (Lenis, ScrollTrigger, ScrollSmoother): effects fit tech, gaming and software pages and a product with a technical subject, never a place, shop or service page (house rule)
- phone-number — footer#contact > div.signature-footer-details > div:nth-of-type(2) > a:nth-of-type(1) "+91 89418 76542". a phone number in international format: "+91 89418 76542"; a visitor can dial it and reach a stranger (and 4 more like it: again here, dialog.site-menu > div.site-menu-body > div.site-menu-navigation > div.site-menu-contact, div.site-menu-body > div.site-menu-navigation > div.site-menu-contact > a:nth-of-type(1), ...)
- section-tile — div#root > div.jh-site > main > section.jh-marquee "mountain air slower days". the section is 604px tall (0.67 screens at 1440x900), shorter than the screen: its tile (the screen from its top) shows 604px of it and 296px of the next section, its heading "REAL STAYS. REAL PERSPECTIVES." on screen
- focus-ring — [data-page-title]:focus. "[data-page-title]:focus" in index-CEBa3DVY.css removes the focus outline and sets nothing in its place
- focus-ring — .jh-site h1[tabindex="-1"]:focus. ".jh-site h1[tabindex="-1"]:focus" in index-CEBa3DVY.css removes the focus outline and sets nothing in its place
- focus-ring — .enquiry-step-heading h2:focus. ".enquiry-step-heading h2:focus" in index-CEBa3DVY.css removes the focus outline and sets nothing in its place
- focus-visible — section#stay > div.jh-chapter-copy > div.jh-chapter-description > button.jh-button "Find your mountain stay". Tab stop 19, button "Find your mountain stay": its focus change is faint: 1.22:1 against the ground, 3:1 needed
- focus-visible — section#nature > div.jh-chapter-copy > div.jh-chapter-description > a.jh-button "Discover the setting". Tab stop 21, a "Discover the setting": its focus change is faint: 1.22:1 against the ground, 3:1 needed
- focus-visible — section#dine > div.jh-chapter-copy > div.jh-chapter-description > a.jh-button "Explore the dining space". Tab stop 23, a "Explore the dining space": its focus change is faint: 1.22:1 against the ground, 3:1 needed
- focus-visible — section#explore > div.jh-chapter-copy > div.jh-chapter-description > a.jh-button "Discover Kausani". Tab stop 25, a "Discover Kausani": its focus change is faint: 1.22:1 against the ground, 3:1 needed
- moment-none — (the page). a place page (--type) deals no moment: every kind carries one, two on a long page (moments.md)
- hero-screen — section#main "EXPERIENCE LIFE AT MYSTIC MOUNTAINFind y". the hero ends at 1800px on a 900px screen, 900px below the fold: it ends at the fold, 1px either way (SR-1)
- section-height — section#experiences "EXPERIENCESLittle rituals,slower days.Ta". the section is 1269px tall (1.4 screens), 369px over one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
- section-height — footer#contact "HOTEL MYSTIC MOUNTAIN · KAUSANISee youin". the section is 1222px tall (1.4 screens), 322px over one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
- section-height — section#faq "REAL STAYS. REAL PERSPECTIVES.Before you". the section is 596px tall (0.7 screens), 304px short of one screen (900px): every section after the hero is one screen or two, 2px either way (and 1 more like it: "mountain airslower days") (SR-2)
- section-height — section#stay "A STAY THAT FEELS LIKE YOUA little space". the section starts at 3069px, 369px below the screen grid (3 x 900px): sections start on whole screens (SR-2)
- section-height — section#nature "NATUREWhere the hills feel like home.The". the section starts at 3969px, 369px below the screen grid (4 x 900px): sections start on whole screens (SR-2)
- section-height — section#dine "AROUND THE TABLEGood company.An open out". the section starts at 4869px, 369px below the screen grid (5 x 900px): sections start on whole screens (and 6 more like it: "A LITTLE CURIOSITY GOES ", "SLOW DOWNSettle in.Switc", "mountain airslower days") (SR-2)
- section-air — section#stay / section#nature. the content of these two sections overlaps by 0px: 128-480px of air between them (every gap out of the band at 1440px, top to bottom: 100px after "EXPERIENCESLittle ri", 0px after "A STAY THAT FEELS LI", 0px after "NATUREWhere the hill", 0px after "AROUND THE TABLEGood", 0px after "A LITTLE CURIOSITY G", 36px after "SLOW DOWNSettle in.S") (SR-3)
- section-air — section#nature / section#dine. the content of these two sections overlaps by 0px: 128-480px of air between them (SR-3)
- section-air — section#dine / section#explore. the content of these two sections overlaps by 0px: 128-480px of air between them (SR-3)
- section-air — footer#contact > div.signature-footer-details "Baijnath Road, opposite Tea Factory, Kau". a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
- section-air — footer#contact > div.signature-footer-wordmark "MYSTICMOUNTAIN · KAUSANI". a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
- one-section — section#place "OUR LITTLE CORNER OF KUMAONAll roads lea". the screen at scroll 8173px (the top of section 9) shows 304px of section 10 and the content of 2 sections, over 24px each beside section 9: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- one-section — section#faq > div.jh-guest-copy > h2.jh-eyebrow "REAL STAYS. REAL PERSPECTIVES.". the screen at scroll 7569px (the top of section 8) shows 296px of section 9 and the heading of section 9 whole and the content of 2 sections, over 24px each beside section 8: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
- one-section — section#experiences "EXPERIENCESLittle rituals,slower days.Ta". the screen at scroll 2700px (stride 3) shows 265px of section 2 and the content of 2 sections, over 24px each beside section 3: a screen shows one section (another may peek 8px, 24px WARN) (and 7 more like it: scroll 3600px, scroll 4500px, scroll 5400px) (SR-4)
- one-heading — section#main > div > h2.jh-eyebrow "EXPERIENCE LIFE AT MYSTIC MOUNTAIN". the hero holds an h2 (1): its heading is the h1, and an h2 opens the next section (SR-5)
- one-heading — section#experiences > div.jh-experiences-heading > h2 "Little rituals,slower days.". headings of two sections show whole on one screen at 8 of 200 scroll positions (4%; at scroll 1250, 7400, 7450, 7500px), here with "our little corner of Kausani": at most 3% on a desktop (SR-5)
- container-edges — section#place "OUR LITTLE CORNER OF KUMAONAll roads lea". the content of section 10 runs 360px from the left and 180px from the right (read from its outermost blocks: no .wrap): the page's container starts at 0px; 360 and 180px are not one margin; the margin is 64-120px at 1440px (one container, equal margins, 2px either way) (SR-6)
- container-edges — section#main "EXPERIENCE LIFE AT MYSTIC MOUNTAINFind y". the content of section 1 runs 115px from the left and 115px from the right (read from its outermost blocks: no .wrap): the page's container starts at 0px (one container, equal margins, 2px either way) (and 10 more like it: "HOTEL MYSTIC MOUNTAIN · ", "A STAY THAT FEELS LIKE Y", "NATUREWhere the hills fe") (SR-6)
- container-edges — div#root "Skip to contentMENUMYSTICMOUNTAIN · KAUS". a <div> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)
- container-edges — section#stay > div.jh-chapter-copy > h2.jh-eyebrow "A STAY THAT FEELS LIKE YOU". the h2 starts 835px right of the container's left: every h1 and h2 starts on it, 2px either way (SR-6)
- container-edges — section#dine > div.jh-chapter-copy > h2.jh-eyebrow "AROUND THE TABLE". the h2 starts 835px right of the container's left: every h1 and h2 starts on it, 2px either way (and 17 more like it: "SLOW DOWN", x -730, x 638) (SR-6)
- container-edges — section#main > div > h2.jh-eyebrow "EXPERIENCE LIFE AT MYSTIC MOUNTAIN". "EXPERIENCE LIFE AT MYSTIC MOUNTA" is set centred across 1210px, over half the 1210px container: text that wide is set left (and 1 more like it: "Find your room in the mo") (SR-6)
- container-edges — div > div.jh-intro-stage > p.jh-intro-text > a:nth-of-type(4) "our little corner of Kausani". a box over half the container wide runs 371-1174px, not on the container's lines at 115-1325px (SR-6)
- row-lines — section#experiences > div.jh-experiences-viewport > div.jh-experiences-track "01 / 06Mountain mornings02 / 06Timber & ". a row of 6 items: its last item ends at 2880px, the container's right line at 1424px (2px either way) (SR-7)
- row-lines — section#experiences > div.jh-experiences-viewport "01 / 06Mountain mornings02 / 06Timber & ". a clipped carousel: its window runs 0-1440px, not on the container at 16-1424px (SR-7)
- split-pair — footer#contact > div.signature-footer-top "HOTEL MYSTIC MOUNTAIN · KAUSANISee youin". the two columns of the split start 43px apart at the top (centred on each other): a split's columns are top-aligned, 8px either way (SR-8)
- collide — div#root > div.jh-site > header.jh-header "MENU MYSTIC MOUNTAIN · KAUSANI ENQUIRE". at the top of the page the fixed bar covers the picture "img: hero.webp": nothing scrolls it out from under the bar
- cut-text — main > section.jh-marquee > div.jh-marquee-top > span "mountain air". cut 29px at the right by the overflow of div#root > div.jh-site > main > section.jh-marquee
- cut-text — main > section.jh-marquee > div.jh-marquee-bottom > span "slower days". cut 18px by the left edge of the screen
- heading-scale — section#faq > div.jh-guest-copy > h3.jh-display "Before you make yourself at home.". h3 headings in 3 sizes, 31px ("Mountain mornings") to 44px (x1.42)
- container — page. no .wrap
