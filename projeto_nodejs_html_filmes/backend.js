// console.log("Hello, NodeJS")

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const Filme = mongoose.model(
  'Filme',
  mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String },
  })
);

async function conectarMongoDB() {
  await mongoose.connect(
    'mongodb+srv://tiago-massuda:1234@cluster0.c1x48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );
}

// let filmes = [
//   {
//     titulo: 'Forrest Gump - O Contador de Histórias',
//     sinopse:
//       'Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.',
//   },
//   {
//     titulo: 'Um Sonho de Liberdade',
//     sinopse:
//       'Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela',
//   },
//   {
//     titulo: 'O Poderoso Chefão',
//     sinopse:
//       "Don Vito Corleone (Marlon Brando) é o chefe de uma 'família' de Nova York que está feliz, pois Connie (Talia Shire), sua filha, se casou com Carlo (Gianni Russo).",
//   },
//   {
//     titulo: 'O Senhor dos Anéis: O Retorno do Rei',
//     sinopse:
//       'Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam para o local na intenção de ajudar a resistência.',
//   },
//   {
//     titulo: 'Titanic',
//     sinopse:
//       'Jack Dawson (Leonardo DiCaprio) é um jovem aventureiro que, na mesa de jogo, ganha uma passagem para a primeira viagem do transatlântico Titanic.',
//   },
// ];

app.listen(3000, () => {
  try {
    conectarMongoDB();
    console.log('Servidor rodando na porta 3000');
  } catch (error) {
    console.log('Erro', error);
  }
});

app.post('/filmes', async (req, res) => {
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  const filme = new Filme({ titulo: titulo, sinopse: sinopse });
  await filme.save();
  const filmes = await Filme.find();
  res.json(filmes);
});

app.get('/filmes', async (req, res) => {
  const filmes = await Filme.find();
  res.json(filmes);
});

// //GET http://localhost:3000/hey
// app.get('/hey', (req, res) => {
//   res.send('hey');
// });

// //GET http://localhost:3000/filmes
// app.get('/filmes', (req, res) => {
//   res.json(filmes);
// });

// //POST http://localhost:3000/filmes
// app.post('/filmes', (req, res) => {
//   //obtém os dados enviados pelo cliente
//   const titulo = req.body.titulo;
//   const sinopse = req.body.sinopse;
//   //monta um objeto agrupando os dados. Ele representa um novo filme
//   const filme = { titulo: titulo, sinopse: sinopse };
//   //adiciona o novo filme à base
//   filmes.push(filme);
//   //responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente, embora não seja obrigatório.
//   res.json(filmes);
// });
