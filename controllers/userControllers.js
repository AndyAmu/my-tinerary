const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken')


const sendEmail = async (email, uniqueString) => { // Encargada de enviar el mail 

    const myOAuth2Client = new OAuth2( // Cargo los nuevos servicios OAuth2
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )
    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESHTOKEN
    });



    // Función para envío de mails
    const accessToken = myOAuth2Client.getAccessToken() // Pedido acceso al token

    const transporter = nodemailer.createTransport({ //Defino el transporte utilizando Nodemailer
        service: "gmail",
        auth: {
            user: process.env.USER,//Defino los datos de autorizacion en .env
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken //Correo electronico, configuro cuentas para permitir el uso de apps
        },
        tls: {
            rejectUnauthorized: false // Para que no salte con el antivirus que estas usasndo el servicio
        } //CONFIGURACIONES DE GMAIL
    })

    
    let mailOptions = { 
        from:  process.env.USER,// de quien
        to: email,       // a quien
        subject: "Verify account ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
        html: `
        <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#FFFFFF"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#ffffff" origin="0.5, 0" position="0.5, 0"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF"><tr><td valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr><td class="es-info-area" align="center" style="padding:0;Margin:0"><table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" bgcolor="#FFFFFF"><tr><td align="left" style="padding:20px;Margin:0"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" class="es-infoblock" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p>
</td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"><tr class="es-visible-simple-html-only"><td class="es-struct-html" align="left" bgcolor="#9fc5e8" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;padding-bottom:40px;background-color:#9fc5e8;background-image:url(https://cdn-3.expansion.mx/dims4/default/e7886b4/2147483647/strip/true/crop/900x506+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F8f%2F08%2Fa72fbe49448a97f323d9bf8940bb%2Fp-p.jpg);background-repeat:no-repeat;background-position:center center" background="https://cdn-3.expansion.mx/dims4/default/e7886b4/2147483647/strip/true/crop/900x506+0+0/resize/1200x675!/format/webp/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F8f%2F08%2Fa72fbe49448a97f323d9bf8940bb%2Fp-p.jpg"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-visible-simple-html-only"><td align="center" class="es-m-txt-c" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:46px;font-style:normal;font-weight:bold;color:#ffffff">My <span style="color:#ffc107">Tinerary</span></h1>
</td></tr></table></td></tr><tr><td align="center" valign="top" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-visible-simple-html-only"><td align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#ffffff;font-size:16px"><strong><span style="color:#000000"><span style="background-color:#ffc107">Confirm your acount. now!</span></span></strong></p></td>
</tr><tr class="es-visible-simple-html-only"><td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#ffc107;border-width:0px;display:inline-block;border-radius:25px;width:auto"><a href=http://localhost:4000/api/verify/${uniqueString} class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#2d1a1a;font-size:20px;border-style:solid;border-color:#ffc107;border-width:0px 30px;display:inline-block;background:#ffc107;border-radius:25px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:bold;font-style:normal;line-height:24px;width:auto;text-align:center">Click Here!</a></span></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr><td align="center" style="padding:0;Margin:0"><table bgcolor="#cfe2f3" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#cfe2f3;width:600px"><tr class="es-visible-simple-html-only"><td class="es-struct-html" align="left" bgcolor="#c3c5c8" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#c3c5c8"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;width:560px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr class="es-visible-simple-html-only"><td align="center" style="padding:5px;Margin:0;font-size:0px"><table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px"><img title="Facebook" src="https://vpplto.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
<td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px"><img title="Twitter" src="https://vpplto.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td><td align="center" valign="top" style="padding:0;Margin:0"><img title="Instagram" src="https://vpplto.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td></tr></table></td>
</tr><tr class="es-visible-simple-html-only"><td align="center" class="h-auto" height="42" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#000000;font-size:14px">My Tinerary © 2022&nbsp;, Inc. All Rights Reserved. By Andres Amuchástegui</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"><tr><td align="center" style="padding:0;Margin:0"><table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px"><tr><td align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="left" style="padding:0;Margin:0;width:600px"><table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td align="center" style="padding:0;Margin:0;display:none"></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
        `
    
    };
    await transporter.sendMail(mailOptions, function (error, response) { // realizo el envio
        // if (error) { console.log('error ++++++' + error) }
        // else {
        //     // console.log(`check ${email}`)

        // }
    })
};


    const UserControllers = {

        singUpUsers: async (req, res) => {
            let { nameUser, lastNameUser, photoUser, email, password, country, from } = req.body.userData
            try {
                const userExists = await User.findOne({ email }) // Busco si hay un usuario por email
                
                if (userExists) {
                    if (userExists.from.indexOf(from) !== -1) {//indexOf me busca el valor desde from si esta almacenado en la BS o no. Si es diferente !== -1 significa que el usuario ya realizo el registro con ese método
                        res.json({
                            success: false,//Respuesta false
                            from: "SignUpForm",//Viene desde el SignUpForm
                            message: `user ${email} already exists, please LOG IN!`
                        })
                    } else {
                        const passwordHasheada = bcryptjs.hashSync(password, 10)//Incripto la password para que la guarde la BD
                        userExists.from.push(from)//El usuario que encontro en su campo from le voy a pushear desde from que es un array en mongo 
                        userExists.password.push(passwordHasheada)// Traigo la contrasela incriptada
                        if (from === "SignUpForm") {
                            userExists.uniqueString = crypto.randomBytes(15).toString('hex') // definir de 15 caracteres y de tipo hexadecimal con métodos de un paquete que ahora está integrado a nodeJS: crypto
                            await userExists.save()
                            await sendEmail(email, userExists.uniqueString)
                            res.json({
                                success: true,
                                from: "SignUpForm",
                                message: `check ${email}! we send you a mail to confirm your SIGN UP!`
                            })

                        } else {
                            userExists.save()
                            res.json({
                                success: true,
                                from: "externalSignUp",
                                message: `user exist! LOG IN please!`
                            })
                        }
                    }
                } else {  // en caso que el usuario sea nuevo vamos a esta condición
                    const passwordHasheada = bcryptjs.hashSync(password, 10)//Encripto la contraseña
                    const newUser = await new User({ // le paso los datos que necesito para crear nuevo usuario
                        nameUser,
                        lastNameUser,
                        photoUser,
                        email,
                        country,
                        from: [from],
                        password: [passwordHasheada],
                        uniqueString:crypto.randomBytes(15).toString('hex'), // definir de 15 caracteres y de tipo hexadecimal con métodos de un paquete que ahora está integrado a nodeJS: crypto
                        
                        emailVerified: false,
                    })
                    //Creo condicional anidado, veo si el from es diferente a mi formulario de registro
                    if (from !== "SignUpForm") {
                        await newUser.save()//Guardo el usuario
                        // console.log(newUser)
                        await sendEmail(email, newUser.uniqueString)
                        res.json({
                            success: true,
                            from: "SignUpForm",
                            message: 'Congratulations, your user has been created with ' + from + ' check the mail and confirm'
                        })
                    } else {
                        await newUser.save()//Guardo el usuario
                        await sendEmail(email, newUser.uniqueString) // Llamo a la funcion encargada del envio del correo electronico
                        res.json({
                            success: true,
                            from: "externalSignUp",
                            message: `check ${email} and finish your SIGN UP!`
                        })
                    }
                }
            } catch (error) {
                // console.log(error)
                res.json({ success: false, message: "Something went wrong, try again in a few minutes" })
            }
        },


        verifyEmail: async (req, res) => {

            const uniuniqueString  = req.params.uniqueString; 
            // console.log(req.params)
        
            const user = await User.findOne({ uniqueString: uniuniqueString })
            if (user) {
                user.emailVerified = true 
                await user.save()
            res.redirect("http://localhost:3000/Login") 

            }
            else { res.json({ success: false, response: "Email has not been confirmed yet!" }) }
        },

        signInUser: async (req, res) => {
            const { email, password, from } = req.body.logedData
            try { // Prueba
                const userExists = await User.findOne({ email }) // busco password mediante from
                // const indexpass = userExists.from.indexOf(from)
                // console.log(usuarioExiste.password[indexpass])

                if (!userExists) { // verifico que usuario exista
                    res.json({ success: false, message: `${email} has no account in MyTinerary, please SIGN UP!` })
                } else {
                    if (from !== "LogInForm") {
                        
                            let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass)) //Coincidencia de password 
                            // console.log(passwordmatch)
                            if (passwordmatch.length > 0) {
                                const userData = {
                                    id: userExists._id,
                                    nameUser: userExists.nameUser,
                                    lastNameUser: userExists.lastNameUser,
                                    photoUser: userExists.photoUser,
                                    email: userExists.email,
                                    country: userExists.country,
                                    from: userExists.from,
                                }
                                
                                userExists.isConected = true
                                userExists.lastConection = new Date().toLocaleString()
                                await userExists.save()

                                const token = jwt.sign({userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24}) // Cadena alfanumérica con caracteres aleatorios
                                
                                res.json({
                                    success: true,
                                    from: from,
                                    response: {token, userData },
                                    message: `Welcome back ${userData.nameUser}!`,
                                })
                            } else {
                                res.json({
                                    success: false,
                                    from: from,
                                    message: 'Wrong password or email, intent again'
                                })
                            }
                        } else {
                            if (userExists.emailVerified) {
                                let passwordmatch = userExists.password.filter(pass => bcryptjs.compareSync(password, pass))

                                if (passwordmatch.length > 0) {
                                const userData = {
                                    id: userExists._id,
                                    nameUser: userExists.nameUser,
                                    lastNameUser: userExists.lastNameUser,
                                    photoUser: userExists.photoUser,
                                    email: userExists.email,
                                    country: userExists.country,
                                    from: userExists.from,
                                }
                                userExists.isConected = true
                                userExists.lastConection = new Date().toLocaleString()
                                await userExists.save()
                                const token = jwt.sign({userData}, process.env.SECRET_KEY, {expiresIn: 60* 60*24})
                                res.json({
                                    success: true,
                                    from: from,
                                    response: { token, userData },
                                    message: "Welcome again " + userData.nameUser + " " + userData.lastNameUser,
                                })
                            } else {
                                res.json({
                                    success: false,
                                    from: from,
                                    message: `verify your ${email} or password!`,
                                })
                            }
                        }else{
                            res.json({ succes: false,
                                from: from,
                                message: `You have not verified your email ${email}, please check your email box to complete your signUp`
                            })
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                res.json({
                    success: false,
                    message: "Something went wrong, try again in a few minutes"
                })
            }
        },

        signOut: async (req, res) => {
        
            const email = req.body.email
            // console.log(req.body.email)
            const user = await User.findOne({email})
            await user
            res.json({
                success: true,
                message: email+' sign out!'})
        },


        verificationToken:(req, res) => {
            //console.log(req.user)
            if (!req.err) {
            res.json({
                success: true,
                response: {
                    id: req.user.id,
                    email: req.user.email,
                    nameUser: req.user.nameUser,
                    photoUser:req.user.photoUser,
                    from: "token"},
                message: "Hi! Welcome back "+req.user.nameUser}) 
            } else {
                res.json({
                    success:false,
                    message:"sign in please!"}) 
            }
        }
    }
    module.exports = UserControllers