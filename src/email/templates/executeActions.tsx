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

const { exp } = createVariablesHelper("executeActions.ftl");

function ExecuteActionsEmail() {
    return (
        <EmailLayout preview="Action required" realmName={exp("realmName")}>
            <EmailHeading>Action Required</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Your administrator has requested that you complete some required actions
                on your <strong>{exp("realmName")}</strong> account.
            </EmailText>
            <EmailText>
                Click the button below to complete the required actions. This link will
                expire in {exp("linkExpiration")} minutes.
            </EmailText>
            <EmailButton href={exp("link")}>Complete Actions</EmailButton>
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
        return `Action Required

Hello ${exp("user.firstName")},

Your administrator has requested that you complete some required actions on your ${exp("realmName")} account.

Click the link below to complete them (expires in ${exp("linkExpiration")} minutes):
${exp("link")}`;
    }
    return render(<ExecuteActionsEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Action required for your ${exp("realmName")} account`;
};
