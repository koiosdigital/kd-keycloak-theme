import { Heading } from "jsx-email";
import { colors } from "./EmailLayout";

interface EmailHeadingProps {
    children: React.ReactNode;
}

export function EmailHeading({ children }: EmailHeadingProps) {
    return (
        <Heading as="h1" style={headingStyle}>
            {children}
        </Heading>
    );
}

const headingStyle: React.CSSProperties = {
    color: colors.neutral900,
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: "30px",
    margin: "0 0 20px 0"
};
