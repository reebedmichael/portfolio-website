# 📱 Responsive & Mobile UX Test Checklist

## Devices & Screen Sizes

- [ ] iPhone SE/8/13 Mini (375x667)
- [ ] iPhone 12/13/14/15 (390x844)
- [ ] iPhone 14 Pro Max (430x932)
- [ ] iPad (768x1024, portrait & landscape)
- [ ] Android small (360x640)
- [ ] Android large (412x915, Pixel 6/7 Pro)
- [ ] Desktop (min 1280px wide)
- [ ] Landscape mode on all devices
- [ ] Unusual breakpoints (e.g. 500px, 700px, 1024px)

## Basic Test Cases

- [ ] Header/logo shrinks smoothly on scroll
- [ ] Floating Action Buttons (FABs) are always at least 44x44px, easy to tap
- [ ] FABs do not block nav or content
- [ ] ScrollToTopButton appears after scrolling 300px, works and animates smoothly
- [ ] Mobile nav toggle works, is accessible, and closes on link tap
- [ ] All interactive elements have `aria-label` and/or `sr-only` text
- [ ] Good color contrast for all text and buttons (use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/))
- [ ] Keyboard navigation: tab through all buttons/links, see visible focus
- [ ] No horizontal scroll on any device/size

## Accessibility

- [ ] All buttons/links are focusable and have visible focus
- [ ] All icons/buttons have descriptive `aria-label` or `sr-only` text
- [ ] Test with screen reader (VoiceOver, TalkBack, NVDA)

## Performance

- [ ] Run Lighthouse mobile audit:  
  ```bash
  npm run lighthouse
  ```
- [ ] Score 90+ on Performance, Accessibility, Best Practices

## Useful Tools

- [ ] [Lighthouse in Chrome DevTools](https://developers.google.com/web/tools/lighthouse)
- [ ] [Responsively App](https://responsively.app/)
- [ ] [BrowserStack](https://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/) for real device testing
- [ ] Chrome DevTools Device Toolbar (toggle with Cmd+Shift+M / Ctrl+Shift+M)

---

**Tip:** Test on real devices whenever possible for the best results! 