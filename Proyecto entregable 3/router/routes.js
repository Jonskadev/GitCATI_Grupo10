module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		if(req.isAuthenticated())
		    if(req.session.user.permiso==1)
		        res.redirect('/viewAdmin');
        if(req.isAuthenticated() && req.session.user.permiso==0)
            res.redirect('/viewUser')
		// render the page and pass in any flash data if it exists
		res.render('index.html', { message: req.flash('signupMessage')
		});
	});



	app.get('/viewAdmin',isAdmin , function (req, res) {
		return res.render('admin_view.html');

	});

    app.get('/viewUser',isUser , function (req, res) {
        res.render('user_view.html',{user: req.session.user});

    });

    //login Admin

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/viewAdmin', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash message
	}));

    //login User

    app.post('/loginuser', passport.authenticate('local-login', {
        successRedirect : '/viewUser', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash message

    }));

	app.get('/logout', function(req,res){
        req.session.destroy();
        res.redirect('/');
    });

	/*app.get('/api/usuarios', function(req, res) {
	 res.render('index_users')
	 });

	 app.put('/api/usuario/:username', function(req, res) {
	 res.render('edit');
	 });*/

}

function isAdmin(req,res,next){

	//console.log(req.admin.privileges)

	if (req.isAuthenticated()){
		if (req.session.user.permiso==1)
			return next();
		else {res.render("loginAdmin.html")}

	}
	else {res.render("loginAdmin.html")}

	// if they aren't redirect them to the home page
	//res.redirect('/');
}

function isUser(req,res,next){

        //console.log(req.admin.privileges)

        if (req.isAuthenticated()){
            if (req.session.user.permiso==0)
                return next();
            else {res.render("loginAdmin.html")}

        }
        else {res.render("loginAdmin.html")}

        // if they aren't redirect them to the home page
        //res.redirect('/');
    }