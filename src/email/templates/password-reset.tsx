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

const { exp } = createVariablesHelper("password-reset.ftl");

function PasswordResetEmail() {
    return (
        <EmailLayout preview="Reset your password" realmName={exp("realmName")}>
            <EmailHeading>Reset Your Password</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Someone has requested to reset your password for your{" "}
                <strong>{exp("realmName")}</strong> account. If you did not make this
                request, you can safely ignore this email.
            </EmailText>
            <EmailText>
                Click the button below to reset your password. This link will expire in{" "}
                {exp("linkExpiration")} minutes.
            </EmailText>
            <EmailButton href={exp("link")}>Reset Password</EmailButton>
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
        return `Reset Your Password

Hello ${exp("user.firstName")},

Someone has requested to reset your password for your ${exp("realmName")} account.

Click the link below to reset your password (expires in ${exp("linkExpiration")} minutes):
${exp("link")}

If you did not request this, you can safely ignore this email.`;
    }
    return render(<PasswordResetEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Reset your ${exp("realmName")} password`;
};
