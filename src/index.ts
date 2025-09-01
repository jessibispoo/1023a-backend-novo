import'dotenv/config'
import mysql from 'mysql2/promise';
console.log(process.env.DBUSER);

import express, {Request,Response} from 'express';
const app = express();

app.get('/', async (req:Request, res:Response) => {
  if (!process.env.DBUSER) {
    res.status(500).send('Váriavel de ambiente DBUSER não definida');
    return;
  }
  if (process.env.DBPASSWORD ==undefined) {
    res.status(500).send('Váriavel de ambiente DBPASS não definida');
    return;
  }
  if (!process.env.DBHOST) {
    res.status(500).send('Váriavel de ambiente DBHOST não definida');
    return;
  }
  if (!process.env.DBNAME) {
    res.status(500).send('Váriavel de ambiente DBNAME não definida');
    return;
  }
  if (!process.env.DBPORT) {
    res.status(500).send('Váriavel de ambiente DBPORT não definida');
    return;
  }
  try {
    const connection = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
      port: Number(process.env.DBPORT),
    });
    res.send("Conexão bem-sucedida ao banco de dados");
    await connection.end();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    res.status(500).send('Erro ao conectar ao banco de dados: ' + error);
  }
});
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
