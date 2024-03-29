
function managePass(app, Account){
    const encrypt = require("../Crypto/encryptLogic.js")
    const decrypt = require("../Crypto/decryptLogic.js");
    app.post("/api/submitPass", (req, res) => {
        let username = req.user.username;
        let masterPass = req.body.masterPass;
        let pass = req.body.pass;
        let name = req.body.name;
        console.log(username);
        Account.findOne({username: username}, (err, data) => {
            if(err){res.json({error: err})}
            let encryptObj = encrypt(masterPass, pass);
            console.log(data);
            data.passwords.push({name: name, cipher: encryptObj.encrypted, salt: encryptObj.salt, iv: encryptObj.iv});
            data.save((err, data) => {
                if(!err){res.send("Saved")}
            })
        })
        
        
    })
    app.post("/api/getPass", (req, res) => {
        let masterPass = req.body.masterPass;
        let username = req.user.username;

        Account.findOne({username: username}, (err, data) => {
            if(err){res.json({error: err})} 
            else{
                let decryptedArr = [];
                data.passwords.forEach((e) => {
                    let salt = e.salt;
                    let iv = e.iv;
                    let cipher = e.cipher;
                    let decryptObj = decrypt(masterPass, salt, iv, cipher);
                    decryptedArr.push({name: e.name, password: decryptObj.decrypted});
                })
                res.send(decryptedArr);
            }
            
        })
        
    })
    app.get("/hi", (req, res) => {
        res.json({message: "hi"})
    })
}

module.exports = managePass;