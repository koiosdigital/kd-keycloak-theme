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

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

function EmailUpdateConfirmationEmail() {
    return (
        <EmailLayout preview="Confirm your new email" realmName={exp("realmName")}>
            <EmailHeading>Confirm Email Update</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                You have requested to update your email address for your{" "}
                <strong>{exp("realmName")}</strong> account to this email address.
            </EmailText>
            <EmailText>
                Click the button below to confirm this change. This link will expire in{" "}
                {exp("linkExpiration")} minutes.
            </EmailText>
            <EmailButton href={exp("link")}>Confirm Email</EmailButton>
            <EmailText muted style={{ marginTop: "24px" }}>
                If the button above doesn't work, copy and paste this link into your
                browser:
            </EmailText>
            <EmailText muted>
                <EmailLink href={exp("link")}>{exp("link")}</EmailLink>
            </EmailText>
            <EmailText muted style={{ marginTop: "16px" }}>
                If you did not request this change, please contact your administrator.
            </EmailText>
        </EmailLayout>
    );
}

export const getTemplate: GetTemplate = async props => {
    if (props.plainText) {
        return `Confirm Email Update

Hello ${exp("user.firstName")},

You have requested to update your email address for your ${exp("realmName")} account.

Click the link below to confirm (expires in ${exp("linkExpiration")} minutes):
${exp("link")}

If you did not request this change, please contact your administrator.`;
    }
    return render(<EmailUpdateConfirmationEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Confirm your new ${exp("realmName")} email address`;
};
