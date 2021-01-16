const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.post("/register", async (req, res) => {
    try {
        //uzywamy express.json() parsera do danych
        const { name, userEmail, password, passwordCheck } = req.body;
        
        //validate
        if(!userEmail || !password || !passwordCheck || !name) 
            return res.status(400).json({msg: "Uzupełnij wszystkie pola"});
        if(password.length < 5) 
            return res.status(400).json({msg: "Hasło musi zawierać conajmniej 5 znaków"});   
        if(password !== passwordCheck) 
            return res.status(400).json({msg: "Wpisane hasła nie są takie same"});

        const existingUser = await User.findOne({ email: userEmail});
        if(existingUser) {
            return res.status(400).json({msg: "Konto o podanym emailu już istnieje"});
        };

        // Hash password before saving in database
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)
        // console.log(passwordHash); 

        const newUser = new User({
            name,
            email: userEmail,
            password: passwordHash,
        });

        //save new user in DB
        const savedUser = await newUser.save();
        res.json(savedUser)
        console.log(savedUser)

    } catch(err) {
        res.status(500).json( {error: err.message})
    }
})

router.post("/login", async (req, res) => {
    try {
        const { userEmail, password } = req.body;

        if( !userEmail || !password) 
            return res.status(400).json({msg: "Uzupełnij wszystkie pola"});
        

        const user = await User.findOne({email: userEmail}) 

        if(!user)
            return res.status(400).json({msg: "Użytkownik o podanym emailu nie istnieje"});

        //porównanie hasła
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Podane hasło jest nieprawidłowe"})
    
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                useremail: user.email
            }
        })
        // console.log(token)

    } catch(err) {
        res.status(500).json({ error: err.message});
    }
})

// drugi argument auth to middleware, ktory sprawdza uwierzytelnienie uzytkownika przed pojsciem dalej
router.delete('/delete', auth, async (req, res) => {
   console.log(req.user)
   try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser)
   } catch(err) {
        res.status(500).json({ error: err.message});
   }
})

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        
        return res.json(true);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
})


module.exports = router