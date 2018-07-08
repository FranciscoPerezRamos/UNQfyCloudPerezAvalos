const apiError = require('./apiError');
const rp = require('request-promise'); 
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use('/api', router);

    class NotificationService{

        constructor(){
            this.suscribers = []
        }

        suscribe(artistId, email){
            this.suscribers.push(new Suscriber(artistId, email));
        }

        unsuscribe(artistId, email){    
            this.deleteSuscriber(new Suscriber(artistId, email));
        }

        notify(artistId, subjet, message, from){
            console.log("Llego al servicio")
            this.sendMail(artistId, subjet, message, from, this.suscribersMailsForArtistId(artistId));
        }

        suscriptions(artistId){
            let suscriptions = [];
            for(let i = this.suscribers - 1; i >= 0; i--) {
                if(this.suscribers[i].artistId === artistId) {
                    suscription.push(this.suscribes[i]);
                }
            }
            return suscriptions;
        }

        deleteSuscriptions(artistId){
            this.suscribers = this.suscribers.filter( sub => sub.artistId !== artistId );
        }

        deleteSuscriber(artistId, email){
            this.suscribers = this.suscribers.filter( sub => sub.artistId !== artistId  && sub.email !== email );
        }

        suscribersMailsForArtistId(artistId){
            let mails = "";
            for(let i = this.suscribers - 1; i >= 0; i--) {
                if(this.suscribers[i].artistId === artistId) {
                    mails = mails + this.suscribers[i].email + ", ";
                }
            }
            return mails;
        }

        sendMail(artistId, subject, message, from, mails){
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com', // server para enviar mail desde gmail
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'lospibes.unqfy.notifier@gmail.com',
                        pass: 'lucacapo',
                    },
                });
                // setup email data with unicode symbols
                const mailOptions = {
                    from: from, // sender address
                    to: mails, // list of receivers 
                    subject: subject, 
                    text: message, // plain text body
                };
                // enviando mail con callbacks
                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                }
                });    
            }

    }

    class Suscriber{
        
        constructor(artistId, email){
            this.artistId = artistId;
            this.email = email;
        }
    }


module.exports = {
    NotificationService,
};