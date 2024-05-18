import "@/styles/global.scss";
import {Metadata} from "next";
import {config} from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Dashboard UI",
    description: "Dashboard UI",
    applicationName: "Dashboard UI",
    authors: {
        name: 'Yash Bhalani'
    },
    generator: 'Next.js',
    referrer: 'origin',
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
