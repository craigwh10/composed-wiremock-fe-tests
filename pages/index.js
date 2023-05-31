import Head from 'next/head'
import { wrapper } from './store'
import { fetchAnalyticsData } from './store/reducer';
import { useSelector } from 'react-redux';

export default function Home() {
  const { data } = useSelector((data) => data.analytics);

  return (
    <>
      <Head>
        <title>My Dashboard</title>
        <meta name="description" content="My application analytics page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2>My Dashboard</h2>
        <h1>{data?.analyticsData.length} days of data</h1>
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