import type { Metadata } from "next";
import "@/styles/index.scss";
import { AppProviders } from "./_providers";
import { allFonts } from "@/scripts/fonts";

export const metadata: Metadata = {
  title: "Refme",
  description: "refme desc",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (<>
    <html lang="ru" className={allFonts}>
      <head>
        <link rel="icon" type="image/svg" href="/images/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  </>);
}
