import { Section, Text } from "jsx-email";
import { colors } from "./EmailLayout";

interface CodeBlockProps {
    code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
    return (
        <Section style={codeContainerStyle}>
            <Text style={codeTextStyle}>{code}</Text>
        </Section>
    );
}

const codeContainerStyle: React.CSSProperties = {
    backgroundColor: colors.neutral100,
    border: `1px solid ${colors.neutral200}`,
    borderRadius: "8px",
    padding: "16px 24px",
    textAlign: "center",
    margin: "16px 0"
};

const codeTextStyle: React.CSSProperties = {
    color: colors.neutral900,
    fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    fontSize: "24px",
    fontWeight: 600,
    letterSpacing: "4px",
    margin: 0
};
