import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../../styles/global/index.scss";
import StoreProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let's Study",
  description: "Study with Herb Edu right now",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode,
  params: { locale: string }
}>) {
  const cookieStore = cookies()
  const themeCache = cookieStore.get('theme')
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <StoreProvider props={{
        children,
        locale,
        messages,
        themeCache: themeCache?.value,
        inter
      }} />
    </html>
  );
}
