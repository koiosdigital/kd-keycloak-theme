import { render } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import type { GetSubject, GetTemplate } from "keycloakify-emails";
import { EmailLayout, EmailHeading, EmailText } from "../components";

const { exp } = createVariablesHelper("email-test.ftl");

function EmailTestEmail() {
    return (
        <EmailLayout preview="Email test" realmName={exp("realmName")}>
            <EmailHeading>Email Configuration Test</EmailHeading>
            <EmailText>
                This is a test email from <strong>{exp("realmName")}</strong>.
            </EmailText>
            <EmailText>
                If you received this email, your SMTP configuration is working correctly.
            </EmailText>
        </EmailLayout>
    );
}

export const getTemplate: GetTemplate = async props => {
    if (props.plainText) {
        return `Email Configuration Test

This is a test email from ${exp("realmName")}.

If you received this email, your SMTP configuration is working correctly.`;
    }
    return render(<EmailTestEmail />);
};

export const getSubject: GetSubject = async () => {
    return `[KEYCLOAK] - SMTP test message`;
};
