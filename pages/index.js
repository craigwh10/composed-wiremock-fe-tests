import Head from 'next/head'
import { wrapper } from '../store/index'
import { fetchAnalyticsData } from '@/store/reducer';
import { useSelector } from 'react-redux';
import { ErrorView } from "@/modules/ErrorView";

export default function Home() {
  const { data, error } = useSelector((data) => data.analytics);

  if (error) {
      return <ErrorView message={error.message} />
  }

  return (
    <>
      <Head>
        <title>My Dashboard</title>
        <meta name="description" content="My application analytics page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2 className="title">My Dashboard</h2>
        <h1>{data?.analyticsData ? data.analyticsData.length : '0'} days of data</h1>
      </main>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;

  // needs to be awaited or race condition occurs.
  await dispatch(fetchAnalyticsData());

  return {
      props: {}
  }
})