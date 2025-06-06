require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

const backupPath = path.join(__dirname, 'backup.json');

app.use(cors());
app.use(express.json());

// ======== MongoDB միացում ======== //
const mongoURI = process.env.MONGO_URI;

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const Admin = mongoose.model('Admin', AdminSchema);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log("✅ MongoDB միացված է");

    const username = 'adminArda';
    const plainPassword = 'arda2025';

    const exists = await Admin.findOne({ username });
    if (exists) {
        console.log("ℹ️ Ադմինը արդեն գոյություն ունի։");
    } else {
        const hashed = await bcrypt.hash(plainPassword, 10);
        await Admin.create({ username, password: hashed });
        console.log("✅ Ադմինը հաջողությամբ ստեղծվեց։");
    }

}).catch((err) => console.error("❌ Mongo միացման սխալ:", err));

// ======== Ադմինի մուտք ======== //
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Օգտատերը գոյություն չունի' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Սխալ գաղտնաբառ' });
        }

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Սերվերի սխալ' });
    }
});

// ======== Nodemailer կոնֆիգուրացիա ======== //
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ======== Գրանցում ======== //
app.post('/api/register', async (req, res) => {
    const { name, specialty, phone, email } = req.body;

    if (!name || !specialty || !phone || !email) {
        return res.status(400).json({ message: 'Բոլոր դաշտերը պարտադիր են։' });
    }
    if (name.trim().length < 3) {
        return res.status(400).json({ message: 'Անունը պետք է լինի առնվազն 3 նիշ։' });
    }
    if (!/^[0-9]{8,12}$/.test(phone)) {
        return res.status(400).json({ message: 'Հեռախոսահամարը պետք է պարունակի միայն թվեր և լինի 8-12 նիշ։' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Էլ․ հասցեն վավեր չէ։' });
    }

    const entry = { name, specialty, phone, email, timestamp: new Date().toISOString() };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Շնորհակալություն գրանցման համար',
            text: `Բարև, ${name}։\n\nՇնորհակալություն ARDA կենտրոնում գրանցվելու համար։\n\n📌 Մասնագիտություն՝ ${specialty}\n📞 Հեռախոս՝ ${phone}\n\nՀարգանքներով՝\nARDA թիմ։`
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFY_EMAIL,
            subject: 'Նոր գրանցում ARDA կենտրոնում',
            text: `📥 Նոր գրանցում\n\n👤 Անուն՝ ${name}\n📌 Մասնագիտություն՝ ${specialty}\n📞 Հեռախոս՝ ${phone}\n📧 Էլ․ հասցե՝ ${email}`
        });

        let existing = fs.existsSync(backupPath) ? JSON.parse(fs.readFileSync(backupPath, 'utf-8')) : [];
        existing.push(entry);
        fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2));

        res.status(200).json({ message: 'Գրանցումն հաջողվեց։' });
    } catch (err) {
        console.error('Email Error:', err);
        try {
            let existing = fs.existsSync(backupPath) ? JSON.parse(fs.readFileSync(backupPath, 'utf-8')) : [];
            existing.push(entry);
            fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2));
            res.status(200).json({ message: 'Email-ը չհաջողվեց, բայց տվյալները պահպանվեցին։' });
        } catch (fileErr) {
            console.error('File write error:', fileErr);
            res.status(500).json({ message: 'Չհաջողվեց պահպանել տվյալները։' });
        }
    }
});

// ======== Կապի ձևաթուղթ ======== //
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Բոլոր դաշտերը պարտադիր են։' });
    }

    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.NOTIFY_EMAIL,
            subject: 'Նոր հաղորդագրություն կայքից',
            html: `<p><strong>Անուն:</strong> ${name}</p><p><strong>Էլ․ փոստ:</strong> ${email}</p><p><strong>Հաղորդագրություն:</strong><br/>${message}</p>`
        });

        await transporter.sendMail({
            from: process.env.NOTIFY_EMAIL,
            to: email,
            subject: 'Շնորհակալություն կապի համար',
            html: `<p>Բարև, ${name}։<br/>Շնորհակալ ենք կապ հաստատելու համար։ Մենք կպատասխանենք հնարավորինս շուտ։</p><p>Հարգանքով՝<br/>ARDA թիմ</p>`
        });

        res.status(200).json({ message: 'Նամակը ուղարկվել է։' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Սխալ նամակ ուղարկելիս։' });
    }
});

// ======== Տվյալների պահպանում/որոնում/ջնջում ======== //
app.get('/api/backup', (req, res) => {
    try {
        const data = fs.existsSync(backupPath) ? JSON.parse(fs.readFileSync(backupPath, 'utf-8')) : [];
        res.status(200).json({ data });
    } catch (err) {
        console.error('Backup read error:', err);
        res.status(500).json({ message: 'Չհաջողվեց կարդալ ֆայլը։' });
    }
});

app.get('/api/search', (req, res) => {
    const q = (req.query.q || '').toLowerCase();
    try {
        const data = fs.existsSync(backupPath) ? JSON.parse(fs.readFileSync(backupPath, 'utf-8')) : [];
        const filtered = data.filter(r =>
            r.name.toLowerCase().includes(q) ||
            r.phone.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q)
        );
        res.json({ data: filtered });
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ message: 'Որոնման սխալ։' });
    }
});

app.delete('/api/registrations', (req, res) => {
    try {
        fs.writeFileSync(backupPath, JSON.stringify([]));
        res.json({ message: 'Բոլոր գրանցումները ջնջվեցին։' });
    } catch (err) {
        console.error('Delete all error:', err);
        res.status(500).json({ message: 'Ջնջման սխալ։' });
    }
});

app.delete('/api/registrations/delete', (req, res) => {
    const { emails } = req.body;
    if (!Array.isArray(emails)) {
        return res.status(400).json({ message: 'Սխալ տվյալներ։' });
    }

    try {
        const data = fs.existsSync(backupPath) ? JSON.parse(fs.readFileSync(backupPath, 'utf-8')) : [];
        const filtered = data.filter(r => !emails.includes(r.email));
        fs.writeFileSync(backupPath, JSON.stringify(filtered, null, 2));
        res.json({ message: 'Նշված գրանցումները ջնջվեցին։' });
    } catch (err) {
        console.error('Delete selected error:', err);
        res.status(500).json({ message: 'Ջնջման սխալ։' });
    }
});

const buildPath = path.join(__dirname, '..', 'my_app', 'build');
if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    // Any route except /api/*
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    console.warn('⚠️ Build folder not found at:', buildPath);
}




// ======== Սերվերի մեկնարկ ======== //
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
