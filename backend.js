const ws=require('ws');
const wss =new ws.WebSocketServer({
    port:3000
},()=>{
    console.log(`server is running on port :3000`)
})

const clients=[]
wss.on('connection',function(ws){
    clients.push(ws)
    
    console.log("connected to frontend")
    connection.query(`select * from chattingapp`,(err,result,fields)=>{
        if(err){
            return console.log(err);
        }
        console.log(result)
        for(var i=0;i<=result.length;i++){
        ws.send(JSON.stringify(result[i]))
        }
    })

    ws.on('message',function(data){
        console.log(JSON.parse(data))
        const datatosend=data.toString()
        console.log("Number of connected clients:", clients.length);

        clients.forEach(client => {
            // Check if the client's WebSocket connection is still open before sending data
            if (client.readyState === ws.OPEN) {
                client.send(datatosend);
            }
        });
        connection.query(`insert into chattingapp (email,name,message) values ("${JSON.parse(data).email}","${JSON.parse(data).name}","${JSON.parse(data).message}")`,(err,result)=>{
            if(err){
                return console.log(err)
            }
        })
    })
})






const mysql= require('mysql2')
const connection= mysql.createConnection({
    host :'sql.freedb.tech',
    user :'freedb_anshujoshi',
    password :'q97tMpRbMEKekV#',
    database:'freedb_chattingapp',
    insecureAuth: true 
})
connection.connect((err)=>{
    if(err){
    console.log(err);
    return;}
    console.log("connection to database successfull")
})

