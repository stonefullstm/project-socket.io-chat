import { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const Message = mongoose.model('Message', {
  name : String,
  message : String
})

const dbUrl = 'mongodb://localhost:27017/SimpleChat';

app.post('/messages', async (req: Request, res: Response) => {
  try{
    const message = new Message(req.body);

    const savedMessage = await message.save()
      console.log('Saved');

    const censored = await Message.findOne({ message:'badword' });
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})

io.on('connection', () =>{
  console.log('A user is connected')
});

mongoose.connect(dbUrl);

const server = http.listen(3000, () => {
  console.log('Server is running on port', server.address().port);
});