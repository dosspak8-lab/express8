const express = require('express');
const session = require('express-session')
const app = express();


const users = [{username:'naga_dragon', password:'1234'}]




app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


function userLogin(req,res,next){
    console.log(req.session.username);
    if(req.session.username){
        next();       
    }else{
        return res.send("User Harus Login...")
    }
}


app.get('/login', (req,res) => {
    return res.render('login')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username atau password kosong');
  }

  const data = users.find(x => x.username === username);

  if (data && data.password === password) {
    req.session.username = username;
    return res.send('User Berhasil Login');
  } else {
    return res.send('User gagal login akwokaowkok');
  }
});

app.get('/public', (req, res) => {
    return res.send('Selamat Mangakses walaupun gk login')
})

app.get('/haruslogin', [userLogin], (req, res) => {
    console.log(req.session.username);
    return res.send('Berhasil Masuk Cik' + 'user login:' + req.session.username);
})


app.listen(3000, () => {
    console.log("server : http://localhost:3000");
})
