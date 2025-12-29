import { render } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { EmailLayout, EmailHeading, EmailText, colors } from "../components";
import { Section, Text } from "jsx-email";

const { exp } = createVariablesHelper("event-update_password.ftl");

function EventUpdatePasswordEmail() {
    return (
        <EmailLayout preview="Password changed" realmName={exp("realmName")}>
            <EmailHeading>Password Changed</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Your password for your <strong>{exp("realmName")}</strong> account was
                recently changed.
            </EmailText>
            <Section style={infoBoxStyle}>
                <Text style={infoTextStyle}>
                    <strong>Time:</strong> {exp("event.date")}
                </Text>
                <Text style={infoTextStyle}>
                    <strong>IP Address:</strong> {exp("event.ipAddress")}
                </Text>
            </Section>
            <EmailText>
                If you made this change, no further action is required.
            </EmailText>
            <EmailText>
                If you did not change your password, please contact your administrator
                immediately to secure your account.
            </EmailText>
        </EmailLayout>
    );
}

const infoBoxStyle: React.CSSProperties = {
    backgroundColor: colors.neutral100,
    border: `1px solid ${colors.neutral200}`,
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0"
};

const infoTextStyle: React.CSSProperties = {
    color: colors.neutral700,
    fontSize: "14px",
    lineHeight: "22px",
    margin: "4px 0"
};

export const getTemplate: GetTemplate = async props => {
    if (props.plainText) {
        return `Password Changed

Hello ${exp("user.firstName")},

Your password for your ${exp("realmName")} account was recently changed.

Time: ${exp("event.date")}
IP Address: ${exp("event.ipAddress")}

If you did not change your password, please contact your administrator immediately.`;
    }
    return render(<EventUpdatePasswordEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Password changed for your ${exp("realmName")} account`;
};
