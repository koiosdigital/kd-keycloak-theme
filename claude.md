# KOIOS DIGITAL - Keycloak Theme

This project uses **Keycloakify v11** to create custom Keycloak login and email themes with React, TypeScript, and Vite.

---

## KOIOS UI Design Guidelines

### Brand Colors

```css
/* Brand Orange Primary (derived from #D4872C) */
--color-primary-50: #fef7ee;
--color-primary-100: #fdecd8;
--color-primary-200: #fad5b0;
--color-primary-300: #f6b87e;
--color-primary-400: #f1924a;
--color-primary-500: #d4872c;  /* Main brand color */
--color-primary-600: #c06a1a;
--color-primary-700: #9f5118;
--color-primary-800: #80421b;
--color-primary-900: #693819;
--color-primary-950: #391b0b;

/* Zinc Neutral */
--color-neutral-50: #fafafa;
--color-neutral-100: #f4f4f5;
--color-neutral-200: #e4e4e7;
--color-neutral-300: #d4d4d8;
--color-neutral-400: #a1a1aa;
--color-neutral-500: #71717a;
--color-neutral-600: #52525b;
--color-neutral-700: #3f3f46;
--color-neutral-800: #27272a;
--color-neutral-900: #18181b;
--color-neutral-950: #09090b;

/* Semantic colors */
--color-error: #ef4444;
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-info: #3b82f6;
```

### Design System (Nuxt UI v4.3.0 Inspired)

#### Typography
- **Font**: Inter (Google Fonts)
- **Body text**: 0.9375rem (15px), neutral-100 on dark backgrounds
- **Labels**: 0.875rem (14px), neutral-300, font-weight 500
- **Small text**: 0.8125rem (13px), neutral-400/500

#### Spacing
- **Border radius**: 8px for inputs/buttons, 16px for cards
- **Padding**: 12px 16px for inputs, 28px for cards
- **Margins**: 20px between form groups

#### Components

**Inputs**
- Background: neutral-800
- Border: 1px solid neutral-700
- Focus: primary-500 border with 3px rgba(212, 135, 44, 0.15) box-shadow
- Hover: neutral-600 border
- Placeholder: neutral-500

**Buttons (Primary)**
- Background: primary-500
- Hover: primary-600
- Font: 0.9375rem, font-weight 600, white

**Checkboxes**
- 16x16px, neutral-800 background, neutral-600 border
- Checked: primary-500 background with white checkmark

**Radio Buttons**
- 16x16px, neutral-800 background, rounded-full
- Checked: neutral-800 bg, primary-500 2px border, 6px primary-500 inner dot

**Cards (Dark Theme)**
- Background: neutral-900
- Border: 1px solid neutral-800
- Box-shadow: subtle multi-layer shadow

**Links**
- Color: primary-400
- Hover: primary-300, underline

**Alerts**
- Border-radius: 8px
- Error: rgba(239, 68, 68, 0.1) bg, #fca5a5 text
- Success: rgba(34, 197, 94, 0.1) bg, #86efac text
- Warning: rgba(245, 158, 11, 0.1) bg, #fcd34d text
- Info: rgba(59, 130, 246, 0.1) bg, #93c5fd text

### Logo Usage

- **Dark backgrounds**: Use `logo_dark.png`
- **Light backgrounds (emails)**: Use `logo_light.png`
- **Logo height**: 40px in login theme
- **Source files**: `src/login/assets/`

### Background Effects (Login Theme)

The login theme uses animated floating blobs:
- Three gradient blobs using brand orange colors
- Blur filter: 80px, Opacity: 0.4
- Animation: 20s ease-in-out infinite floating motion

---

## Project Structure

```
src/
├── login/
│   ├── KcPage.tsx        # Main page component - route pages here
│   ├── KcContext.ts      # Type definitions for kcContext
│   ├── i18n.ts           # Internationalization setup
│   ├── assets/           # Images, fonts, and other assets
│   └── pages/            # Custom page components (after ejecting)
├── kc.gen.tsx            # Auto-generated types (do not edit)
└── main.tsx              # App entry point
```

## Common Customization Tasks

### Changing the Background Image

1. Place your image in `src/login/assets/background.png`
2. Create `src/login/main.css`:
```css
body.kcBodyClass {
  background: url(./assets/background.png) no-repeat center center fixed;
  background-size: cover;
}
```
3. Import in `src/login/KcPage.tsx`:
```tsx
import "./main.css";
```

**Hot-swappable background (no rebuild required):**
- Place image in `public/background.png`
- Reference with absolute path: `url(/background.png)`
- In Keycloak: `/opt/keycloak/themes/<theme-name>/login/resources/dist/background.png`

### Adding Your Logo

**Method 1: Eject Template and import asset**
```bash
npx keycloakify eject-page  # Select login -> Template.tsx
```
Then import your logo:
```tsx
import logoPngUrl from "./assets/logo.png";
// Use: <img src={logoPngUrl} alt="Logo" />
```

**Method 2: CSS-only (without ejecting)**
Target the header class in your CSS file.

### Custom Fonts

**From Google Fonts:**
```css
/* src/login/main.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body.kcBodyClass {
  font-family: "Inter", sans-serif;
}
```

**Self-hosted fonts (for enterprise/air-gapped environments):**
1. Place font files in `src/login/assets/fonts/`
2. Define @font-face in CSS
3. Import the CSS in KcPage.tsx

### Using Tailwind CSS

1. Install Tailwind following the [Vite guide](https://tailwindcss.com/docs/guides/vite)
2. Use `@apply` directives to target Keycloak classes:
```css
.kcFormGroupClass {
  @apply mb-4;
}
.kcButtonPrimaryClass {
  @apply bg-blue-600 hover:bg-blue-700 text-white;
}
```
3. Or eject pages and use Tailwind classes directly in JSX

See the `tailwind` branch of keycloakify-starter for a complete example.

## CSS Customization

### Class Types
- **`kc*` classes** (e.g., `kcLabelClass`): No default styles, use as custom hooks
- **`pf-*` classes** (e.g., `pf-c-form__label`): PatternFly framework styles

### Disabling Default Styles
In `KcPage.tsx`, set `doUseDefaultCss={false}` to remove all PatternFly styles:
```tsx
<DefaultPage
  doUseDefaultCss={false}  // Remove default PatternFly CSS
  // ... other props
/>
```

### Custom Classes
Modify the `classes` object in `KcPage.tsx`:
```tsx
const classes = {
  kcHtmlClass: "my-html-class",
  kcBodyClass: "my-body-class",
  kcButtonPrimaryClass: "btn btn-primary",  // Bootstrap example
} satisfies { [key in ClassKey]?: string };
```

## Ejecting Pages for Full Customization

To customize a specific page component:
```bash
npx keycloakify eject-page
```
Select the page (e.g., `login.ftl` → `Login.tsx`), then add it to the switch in `KcPage.tsx`:

```tsx
import Login from "./pages/Login";

switch (kcContext.pageId) {
  case "login.ftl":
    return (
      <Login
        kcContext={kcContext}
        i18n={i18n}
        classes={classes}
        Template={Template}
        doUseDefaultCss={true}
      />
    );
  default:
    return <DefaultPage /* ... */ />;
}
```

## Internationalization (i18n)

### Adding Custom Messages
Edit `src/login/i18n.ts`:
```tsx
const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: {
      myCustomMessage: "Hello!",
      loginAccountTitle: "Sign in to MyApp"
    },
    fr: {
      myCustomMessage: "Bonjour!",
      loginAccountTitle: "Connectez-vous à MyApp"
    }
  })
  .build();
```

### Using Translations
```tsx
const { msg, msgStr } = useI18n({ kcContext });
// JSX: {msg("myCustomMessage")}
// String: msgStr("myCustomMessage")
```

## Theme Variants

Create multiple themes from one codebase in `vite.config.ts`:
```tsx
keycloakify({
  themeName: ["my-theme", "my-theme-dark"],
  accountThemeImplementation: "none"
})
```

Access current variant via `kcContext.themeName` to conditionally apply styles.

## Environment Variables

Define in `vite.config.ts`:
```tsx
keycloakify({
  environmentVariables: [
    { name: "MY_APP_API_URL", default: "" },
    { name: "MY_APP_BRAND_COLOR", default: "#0066cc" }
  ]
})
```

Access at runtime:
```tsx
const apiUrl = kcContext.properties.MY_APP_API_URL;
```

Set when running Keycloak:
```bash
docker run -e MY_APP_API_URL="https://api.example.com" ...
```

## Development & Testing

### Local Development
```bash
npm run dev          # Vite dev server
npm run storybook    # Component preview with mock data
```

### Test in Keycloak (Docker)
```bash
npx keycloakify start-keycloak
```

### Build for Production
```bash
npm run build-keycloak-theme
```
Output: `dist_keycloak/*.jar`

## Deployment

### JAR File Selection
- **Keycloak 11-21, 26+**: `keycloak-theme-for-kc-all-other-versions.jar`
- **Keycloak 22-25**: `keycloak-theme-for-kc-22-to-25.jar`

### Docker
```bash
docker run -v "./dist_keycloak/keycloak-theme.jar:/opt/keycloak/providers/keycloak-theme.jar" \
  quay.io/keycloak/keycloak:26.0 start-dev
```

### Enable Theme
1. Keycloak Admin Console → Realm Settings → Themes
2. Select your theme from the Login Theme dropdown
3. For per-client: Clients → Select client → Login Theme

## Documentation Links

- [Keycloakify Docs](https://docs.keycloakify.dev)
- [CSS Customization](https://docs.keycloakify.dev/css-customization)
- [i18n Guide](https://docs.keycloakify.dev/features/i18n)
- [Theme Variants](https://docs.keycloakify.dev/features/theme-variants)
- [Environment Variables](https://docs.keycloakify.dev/features/environment-variables)
- [Discord Community](https://discord.gg/mJdYJSdcm4)
