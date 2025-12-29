import { useEffect, useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

// Import logo assets
import logoDark from "./assets/logo_dark.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={kcClsx("kcLoginClass")}>
            {/* Animated background blobs */}
            <div className="background-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* Language selector - top right */}
            {enabledLanguages.length > 1 && (
                <div className="language-selector">
                    <button
                        className="language-button"
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        onBlur={() => setTimeout(() => setIsLangDropdownOpen(false), 150)}
                        aria-label={msgStr("languages")}
                        aria-haspopup="true"
                        aria-expanded={isLangDropdownOpen}
                    >
                        <span>{currentLanguage.label}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    {isLangDropdownOpen && (
                        <ul className="language-dropdown">
                            {enabledLanguages.map(({ languageTag, label, href }) => (
                                <li key={languageTag}>
                                    <a
                                        href={href}
                                        className={currentLanguage.languageTag === languageTag ? "active" : ""}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Main content wrapper */}
            <div className="login-content">
                {/* Logo */}
                <div className="logo-wrapper">
                    <img
                        src={logoDark}
                        alt="KOIOS DIGITAL"
                        className="logo"
                    />
                </div>

                {/* Page title - outside card */}
                <div className="page-header">
                    {(() => {
                        if (auth !== undefined && auth.showUsername && !auth.showResetCredentials) {
                            return (
                                <div className="attempted-username">
                                    <span>{auth.attemptedUsername}</span>
                                    <a href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                        {msg("restartLoginTooltip")}
                                    </a>
                                </div>
                            );
                        }
                        return (
                            <>
                                <h1 className="page-title">{headerNode}</h1>
                                {displayRequiredFields && (
                                    <p className="required-hint">
                                        <span className="required">*</span> {msg("requiredFields")}
                                    </p>
                                )}
                            </>
                        );
                    })()}
                </div>

                {/* Form card - just the form, no header */}
                <div className="form-card">
                    {/* Alert messages */}
                    {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                        <div className={clsx("alert", `alert-${message.type}`)}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(message.summary)
                                }}
                            />
                        </div>
                    )}

                    {/* Form content */}
                    {children}

                    {/* Try another way */}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <a
                                href="#"
                                className="try-another-way"
                                onClick={() => {
                                    document.forms["kc-select-try-another-way-form" as never].requestSubmit();
                                    return false;
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </a>
                        </form>
                    )}

                    {/* Social providers */}
                    {socialProvidersNode}
                </div>

                {/* Info section - outside card */}
                {displayInfo && (
                    <div className="info-section">
                        {infoNode}
                    </div>
                )}
            </div>
        </div>
    );
}
