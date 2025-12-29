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

const { exp } = createVariablesHelper("org-invite.ftl");

function OrgInviteEmail() {
    return (
        <EmailLayout preview="Organization invitation" realmName={exp("realmName")}>
            <EmailHeading>You're Invited!</EmailHeading>
            <EmailText>
                Hello,
            </EmailText>
            <EmailText>
                You have been invited to join <strong>{exp("organization.name")}</strong>{" "}
                on <strong>{exp("realmName")}</strong>.
            </EmailText>
            <EmailText>
                Click the button below to accept the invitation and set up your account.
                This link will expire in {exp("linkExpiration")} minutes.
            </EmailText>
            <EmailButton href={exp("link")}>Accept Invitation</EmailButton>
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
        return `You're Invited!

You have been invited to join ${exp("organization.name")} on ${exp("realmName")}.

Click the link below to accept the invitation (expires in ${exp("linkExpiration")} minutes):
${exp("link")}`;
    }
    return render(<OrgInviteEmail />);
};

export const getSubject: GetSubject = async () => {
    return `You've been invited to join ${exp("organization.name")}`;
};
