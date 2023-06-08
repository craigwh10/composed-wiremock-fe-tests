import Head from "next/head";

export const ErrorView = ({message}) => (
    <>
        <Head>
            <title>Error</title>
            <meta name="description" content="Analytics Error" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
            <h2>My Dashboard</h2>
            <p>{message}</p>
        </main>
    </>
)