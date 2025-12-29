import { Button } from "jsx-email";
import { colors } from "./EmailLayout";

interface EmailButtonProps {
    href: string;
    children: React.ReactNode;
}

export function EmailButton({ href, children }: EmailButtonProps) {
    return (
        <Button
            href={href}
            width={200}
            height={44}
            align="center"
            backgroundColor={colors.primary}
            textColor="#ffffff"
            borderRadius={8}
            fontSize={15}
        >
            {children}
        </Button>
    );
}
