const busboy = require('busboy');
const Papa = require('papaparse'); // CSV parser that works in Node

module.exports = (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const bb = busboy({ headers: req.headers });

  let fileBuffer = Buffer.from([]);

  bb.on('file', (name: string, file: any) => {
    file.on('data', (data: any) => {
      fileBuffer = Buffer.concat([fileBuffer, data]);
    });

    file.on('end', () => {
      const csvText = fileBuffer.toString('utf8');

      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      // TODO: Save `parsed.data` to DB under authenticated user
      console.log(parsed.data);
    });
  });

  bb.on('finish', () => {
    res.status(200).json({ message: 'File processed' });
  });

  req.pipe(bb);
};
