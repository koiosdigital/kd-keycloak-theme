import { render } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { EmailLayout, EmailHeading, EmailText, colors } from "../components";
import { Section, Text } from "jsx-email";

const { exp } = createVariablesHelper("event-login_error.ftl");

function EventLoginErrorEmail() {
    return (
        <EmailLayout preview="Failed login attempt detected" realmName={exp("realmName")}>
            <EmailHeading>Security Alert</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                A failed login attempt was detected on your{" "}
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
                If this was you, no action is needed. If you did not attempt to log in,
                please secure your account immediately by changing your password.
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
        return `Security Alert - Failed Login Attempt

Hello ${exp("user.firstName")},

A failed login attempt was detected on your ${exp("realmName")} account.

Time: ${exp("event.date")}
IP Address: ${exp("event.ipAddress")}

If this was not you, please secure your account immediately.`;
    }
    return render(<EventLoginErrorEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Security Alert: Failed login attempt on ${exp("realmName")}`;
};
