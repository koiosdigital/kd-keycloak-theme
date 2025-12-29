import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Section,
    Text,
    Hr,
    Font
} from "jsx-email";
import type { PropsWithChildren } from "react";

// Brand colors matching login theme
const colors = {
    primary: "#d4872c",
    primaryLight: "#f1924a",
    neutral50: "#fafafa",
    neutral100: "#f4f4f5",
    neutral200: "#e4e4e7",
    neutral300: "#d4d4d8",
    neutral400: "#a1a1aa",
    neutral500: "#71717a",
    neutral600: "#52525b",
    neutral700: "#3f3f46",
    neutral800: "#27272a",
    neutral900: "#18181b"
};

interface EmailLayoutProps extends PropsWithChildren {
    preview?: string;
    realmName?: string;
}

export function EmailLayout({ children, preview, realmName }: EmailLayoutProps) {
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Helvetica"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2",
                        format: "woff2"
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                {preview && <title>{preview}</title>}
            </Head>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    {/* Header with Logo */}
                    <Section style={headerStyle}>
                        <Img
                            src="cid:logo.png"
                            alt="KOIOS DIGITAL"
                            width={160}
                            height={40}
                            style={logoStyle}
                        />
                    </Section>

                    {/* Main Content */}
                    <Section style={contentStyle}>{children}</Section>

                    {/* Footer */}
                    <Hr style={dividerStyle} />
                    <Section style={footerStyle}>
                        <Text style={footerTextStyle}>
                            This email was sent by{" "}
                            <span style={{ color: colors.primary }}>{realmName || "KOIOS DIGITAL"}</span>
                        </Text>
                        <Text style={footerSubTextStyle}>
                            If you did not request this email, you can safely ignore it.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const bodyStyle: React.CSSProperties = {
    backgroundColor: colors.neutral100,
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    margin: 0,
    padding: "40px 20px"
};

const containerStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "560px",
    margin: "0 auto",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
};

const headerStyle: React.CSSProperties = {
    backgroundColor: colors.neutral900,
    borderRadius: "12px 12px 0 0",
    padding: "28px 32px",
    textAlign: "center"
};

const logoStyle: React.CSSProperties = {
    display: "block",
    margin: "0 auto"
};

const contentStyle: React.CSSProperties = {
    padding: "32px"
};

const dividerStyle: React.CSSProperties = {
    borderColor: colors.neutral200,
    borderWidth: "1px 0 0 0",
    margin: "0 32px"
};

const footerStyle: React.CSSProperties = {
    padding: "24px 32px"
};

const footerTextStyle: React.CSSProperties = {
    color: colors.neutral500,
    fontSize: "13px",
    lineHeight: "20px",
    margin: 0,
    textAlign: "center"
};

const footerSubTextStyle: React.CSSProperties = {
    color: colors.neutral400,
    fontSize: "12px",
    lineHeight: "18px",
    margin: "8px 0 0 0",
    textAlign: "center"
};

export { colors };
