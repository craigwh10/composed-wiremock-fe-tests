export default async function handler(_req, res) {
  try {
    const response = await fetch(`${process.env.ANALYTICS_API_URL}/analytics`, {
      method: 'GET'
    })

    if (!response) {
      res.status(400).send({error: 'No data'});
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {

    res.status(500).json({error: err.message});
  }

}
