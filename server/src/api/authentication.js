import token from '../util/token';
import UserModel from '../user/model';

export default {
    signup : (req, res, next) => {
        const { email, password, firstName, lastName, user_role, venue_id, mobile, subscription } = req.body;
        console.log(req.body)
        if (!email || !password || !user_role) {
            return res
                .status(422)
                .send({error: 'You must provide email and password and user type.'});
        }
        UserModel   
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err) return res.status(422).send(err);
                if (existingUser) {
                    return res
                        .status(422)
                        .send({error: 'Email is in use'});
                }
                const user = new UserModel({
                    name: {
                        first: firstName, 
                        last: lastName
                    },
                    email: email,
                    user_role:user_role,
                    venue_id:venue_id,
                    phone:{
                        number:mobile
                    },
                    password: password,
                    subscription: subscription
                })
    
                user.save(function (err, savedUser) {
                    if (err) {
                        return next(err)
                    }
    
                    res.json({
                        success: true,
                        auth_type:user.user_role,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },
    
    signin: (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .status(422)
                .send({error: 'You must provide email and password.'});
        }
        UserModel
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err || !existingUser) {
                    return res.status(401).send(err || {error: "User Not Found"})
                }
                if (existingUser) {
                    existingUser.comparedPassword(password, function(err, good) {
                        if (err || !good) {
                                return res.status(401).send(err || 'User not found')
                            }
    
                            res.send({
                                auth_type: existingUser.user_role,
                                token: token.generateToken(existingUser)
                            })
                    })
                }
            })
    }
}
