import { render } from "jsx-email";
import { createVariablesHelper } from "keycloakify-emails/variables";
import type { GetSubject, GetTemplate } from "keycloakify-emails";
import {
    EmailLayout,
    EmailHeading,
    EmailText,
    EmailButton,
    EmailLink
} from "../components";

const { exp } = createVariablesHelper("email-verification.ftl");

function EmailVerificationEmail() {
    return (
        <EmailLayout preview="Verify your email address" realmName={exp("realmName")}>
            <EmailHeading>Verify Your Email</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Thank you for registering with <strong>{exp("realmName")}</strong>. Please
                verify your email address to complete your registration.
            </EmailText>
            <EmailText>
                Click the button below to verify your email. This link will expire in{" "}
                {exp("linkExpiration")} minutes.
            </EmailText>
            <EmailButton href={exp("link")}>Verify Email Address</EmailButton>
            <EmailText muted style={{ marginTop: "24px" }}>
                If the button above doesn't work, copy and paste this link into your
                browser:
            </EmailText>
            <EmailText muted>
                <EmailLink href={exp("link")}>{exp("link")}</EmailLink>
            </EmailText>
        </EmailLayout>
    );
}

export const getTemplate: GetTemplate = async props => {
    if (props.plainText) {
        return `Verify Your Email

Hello ${exp("user.firstName")},

Thank you for registering with ${exp("realmName")}.

Click the link below to verify your email (expires in ${exp("linkExpiration")} minutes):
${exp("link")}`;
    }
    return render(<EmailVerificationEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Verify your ${exp("realmName")} email address`;
};
