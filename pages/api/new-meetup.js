import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
    );

    const db = client.db();
    const meetups = db.collection('meetups');

    meetups.insertOne(data);

    client.close();

    res.status(201).json({
      message: 'Successfuly created meetup.',
    });
  }
};

export default handler;
