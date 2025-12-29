import { Link } from "jsx-email";
import { colors } from "./EmailLayout";

interface EmailLinkProps {
    href: string;
    children: React.ReactNode;
}

export function EmailLink({ href, children }: EmailLinkProps) {
    return (
        <Link href={href} style={linkStyle}>
            {children}
        </Link>
    );
}

const linkStyle: React.CSSProperties = {
    color: colors.primary,
    textDecoration: "none"
};
