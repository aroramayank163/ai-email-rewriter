const { error } = require('console');
const express =  require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../frontend/public")))


app.get("/", (req, res, next)=>{
    res.sendFile(path.join(__dirname, "../frontend/public/main.html"))
})
//API
app.post("/api", async (req, res, next)=>{
    const {input, persuasive, professional, academic} = req.body;
    
    const elements = [];
    if (persuasive) elements.push('persuasive');
    if (professional) elements.push('professional');
    if (academic) elements.push('academic')

    let tone;
    if (elements.length<=0){tone = 'Normal'}
    else tone = elements.join(',')

    const wrote = `I just want you to write "${input}" email and 
    use these helpers like ${tone} to enhance the rewriting of email for user`


   try{ 
    const KEY = "YOUR_KEY"
    const data = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${KEY}`, {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {parts: [
                        {
                            text: wrote
                        }
                    ]}
                ]
            })
    })

    const apires = await data.json();
    console.log(apires);
    const output = apires?.candidates?.[0]?.content?.parts?.[0].text;

    if(!output){
        return res.json({
        success: false,
        error: "Server is Down, Please again Later"
        });
    }
     res.json({
        success: true,
        output: output
    });
    

 } catch (err) {
    console.log(err)
   }
})


app.listen(PORT, ()=>{
    console.log("Running")
})
