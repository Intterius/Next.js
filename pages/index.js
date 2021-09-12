import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='browse lots of meetups available for you'
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
      })),
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async () => {
//   return {
//     props: {
//       meetups: mockup,
//     },
//   };
// };

export default HomePage;
