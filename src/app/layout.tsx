import type { Metadata } from "next";
import "@/styles/index.scss";
import ReduxProvider from "@/store/ReduxProvider";
import { UIProvider } from "@/UI";
import { Layout } from "@/app/.pages";

export const metadata: Metadata = {
  title: "Refme",
  description: "",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (<>
    <ReduxProvider>
      <UIProvider>
        <html lang="en">
          <head>
            <link rel="icon" type="image/svg" href="/icons/logo.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="description" content="Описание вашего проекта" />
          </head>
          <body>
            <Layout>
              {children}
            </Layout>
          </body>
        </html>
      </UIProvider>
    </ReduxProvider>
  </>);
}
