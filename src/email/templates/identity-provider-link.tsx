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

const { exp } = createVariablesHelper("identity-provider-link.ftl");

function IdentityProviderLinkEmail() {
    return (
        <EmailLayout preview="Link your account" realmName={exp("realmName")}>
            <EmailHeading>Link Your Account</EmailHeading>
            <EmailText>
                Hello {exp("user.firstName")},
            </EmailText>
            <EmailText>
                Someone wants to link your <strong>{exp("realmName")}</strong> account
                with a <strong>{exp("identityProviderDisplayName")}</strong> account of
                user {exp("identityProviderContext.username")}.
            </EmailText>
            <EmailText>
                If this was you, click the link below to link the accounts. This link will
                expire in {exp("linkExpiration")} minutes.
            </EmailText>
            <EmailButton href={exp("link")}>Link Accounts</EmailButton>
            <EmailText muted style={{ marginTop: "24px" }}>
                If the button above doesn't work, copy and paste this link into your
                browser:
            </EmailText>
            <EmailText muted>
                <EmailLink href={exp("link")}>{exp("link")}</EmailLink>
            </EmailText>
            <EmailText muted style={{ marginTop: "16px" }}>
                If you don't want to link your accounts, you can safely ignore this email.
            </EmailText>
        </EmailLayout>
    );
}

export const getTemplate: GetTemplate = async props => {
    if (props.plainText) {
        return `Link Your Account

Hello ${exp("user.firstName")},

Someone wants to link your ${exp("realmName")} account with a ${exp("identityProviderDisplayName")} account of user ${exp("identityProviderContext.username")}.

If this was you, click the link below (expires in ${exp("linkExpiration")} minutes):
${exp("link")}

If you don't want to link your accounts, you can safely ignore this email.`;
    }
    return render(<IdentityProviderLinkEmail />);
};

export const getSubject: GetSubject = async () => {
    return `Link your ${exp("realmName")} account with ${exp("identityProviderDisplayName")}`;
};
