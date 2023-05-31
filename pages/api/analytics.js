// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(_req, res) {
  const response = await fetch('http://localhost:8080/analytics', {
    method: 'GET'
  })

  const data = await response.json();
  res.status(200).json(data);
}
