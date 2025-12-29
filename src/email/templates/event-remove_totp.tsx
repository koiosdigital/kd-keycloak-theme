import { render } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { EmailLayout, EmailHeading, EmailText, colors } from "../components";
import { Section, Text } from "jsx-email";

const { exp } = createVariablesHelper("event-remove_totp.ftl");

function EventRemoveTotpEmail() {
    return (
        <EmailLayout
            preview="Two-factor authentication removed"
            realmName={exp("realmName")}
        >
            <EmailHeading>2FA Removed</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Two-factor authentication (TOTP) was removed from your{" "}
                <strong>{exp("realmName")}</strong> account.
            </EmailText>
            <Section style={alertBoxStyle}>
                <Text style={alertTextStyle}>
                    <strong>Time:</strong> {exp("event.date")}
                </Text>
                <Text style={alertTextStyle}>
                    <strong>IP Address:</strong> {exp("event.ipAddress")}
                </Text>
            </Section>
            <EmailText>
                If you made this change, no further action is required.
            </EmailText>
            <EmailText>
                If you did not remove two-factor authentication, please contact your
                administrator immediately to secure your account.
            </EmailText>
        </EmailLayout>
    );
}

const alertBoxStyle: React.CSSProperties = {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0"
};

const alertTextStyle: React.CSSProperties = {
    color: colors.neutral700,
    fontSize: "14px",
    lineHeight: "22px",
    margin: "4px 0"
};

export const getTemplate: GetTemplate = async props => {
    if (props.plainText) {
        return `Two-Factor Authentication Removed

Hello ${exp("user.firstName")},

Two-factor authentication (TOTP) was removed from your ${exp("realmName")} account.

Time: ${exp("event.date")}
IP Address: ${exp("event.ipAddress")}

If you did not remove 2FA, please contact your administrator immediately.`;
    }
    return render(<EventRemoveTotpEmail />);
};

export const getSubject: GetSubject = async () => {
    return `2FA removed from your ${exp("realmName")} account`;
};
