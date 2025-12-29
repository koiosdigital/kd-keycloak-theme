import { Text } from "jsx-email";
import { colors } from "./EmailLayout";

interface EmailTextProps {
    children: React.ReactNode;
    muted?: boolean;
    style?: React.CSSProperties;
}

export function EmailText({ children, muted = false, style }: EmailTextProps) {
    return (
        <Text style={{ ...textStyle, ...(muted ? mutedStyle : {}), ...style }}>
            {children}
        </Text>
    );
}

const textStyle: React.CSSProperties = {
    color: colors.neutral700,
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 16px 0"
};

const mutedStyle: React.CSSProperties = {
    color: colors.neutral500,
    fontSize: "13px"
};
