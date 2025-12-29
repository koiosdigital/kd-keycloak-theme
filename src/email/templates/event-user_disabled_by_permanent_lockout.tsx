import { render } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { EmailLayout, EmailHeading, EmailText, colors } from "../components";
import { Section, Text } from "jsx-email";

const { exp } = createVariablesHelper("event-user_disabled_by_permanent_lockout.ftl");

function EventUserDisabledPermanentEmail() {
    return (
        <EmailLayout preview="Account locked" realmName={exp("realmName")}>
            <EmailHeading>Account Permanently Locked</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Your <strong>{exp("realmName")}</strong> account has been permanently
                locked due to too many failed login attempts.
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
                Please contact your administrator to unlock your account and regain
                access.
            </EmailText>
        </EmailLayout>
    );
}

const alertBoxStyle: React.CSSProperties = {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.25)",
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
        return `Account Permanently Locked

Hello ${exp("user.firstName")},

Your ${exp("realmName")} account has been permanently locked due to too many failed login attempts.

Time: ${exp("event.date")}
IP Address: ${exp("event.ipAddress")}

Please contact your administrator to unlock your account.`;
    }
    return render(<EventUserDisabledPermanentEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Your ${exp("realmName")} account has been locked`;
};
