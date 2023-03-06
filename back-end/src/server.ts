import app from './app';
const PORT = 3001;

const server = app.listen(PORT, async () => {
  console.log(`Chat server está sendo executado na porta ${PORT}`);
});

export default server;