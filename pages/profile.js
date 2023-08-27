import React, { useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";

export default function Profile() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      if (!session) {
        signIn();
      } else {
        setIsLoading(false);
      }
    };
    securePage();
  }, []);
  if (isLoading) {
    return <h1>لطفا منتظر بمانید...</h1>;
  }
  return (
    <div className="container">
      <Head>
        <title>پروفایل</title>
      </Head>
      <p>نام کابر: {session?.user?.name}</p>
      <p>ایمیل: {session?.user?.email}</p>
    </div>
  );
}