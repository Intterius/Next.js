import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../components/meetups/MeetupDetail';

const MeetupDetails = ({ title, image, description, address }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      id: meetup._id.toString(),
      image: meetup.image,
      title: meetup.title,
      description: meetup.description,
      address: meetup.address,
    },
  };
};

export default MeetupDetails;
