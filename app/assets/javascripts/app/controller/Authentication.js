Ext.define("AM.controller.Authentication", {
	extend : "Ext.app.Controller",
	views : [
		"AuthenticationForm",
		'Viewport',
		"ProtectedContent"
	],
	
	currentUser : {
		email : "email@gmail.com",
		auth_token : 'auth_tokeno2u3o2oi3o23u032'
	}, 
	roles : {}, 
	
	refs: [
		{
			ref: 'viewport',
			selector: 'vp'
		} 
	],
	
	init : function( application ) {
		this.control({
			"button#loginBtn" : {
				click : this.onLoginClick
			},
			
			"button#logoutBtn": {
				click : this.onLogoutClick
			}
			
		});
	},
	
	onLoginClick: function( button ){
		var me = this; 
		
		var fieldset = button.up('fieldset');
		// button.up('fieldset').setLoading( true ) ;
		fieldset.setLoading( true ) ;
	
		var form =  button.up('form');
		var emailField = form.getForm().findField('email');
		var passwordField = form.getForm().findField('password');
		
	 
		
		me.authenticateUser({
			user_login : {
				email : emailField.getValue(),
				password : passwordField.getValue()
			}
		}, fieldset); 
	
	},
	
	onLogoutClick: function( button ){
		var me = this;
		me.currentUser['auth_token'] = null; 
		// this could go to the localStorage. much more awesome 
		me.showLoginForm()
	},
	
	authenticateUser : function( data , fieldset ){
		var me = this; 
		Ext.Ajax.request({
		    url: 'api/users/sign_in',
		    method: 'POST',
		    params: {
		    },
		    jsonData: data,
		    success: function(result, request ) {
						fieldset.setLoading( false ) ;
						var responseText=  result.responseText; 
						var data = Ext.decode(responseText );
						me.currentUser['auth_token'] = data['auth_token'];
						
						me.showProtectedArea(); 
		    },
		    failure: function(result, request ) {
						fieldset.setLoading( false ) ;
						Ext.Msg.alert("Login Error", "The email-password combination is invalid");
		    }
		});
	},
	
	showProtectedArea : function(){
		var me = this; 
		me.getViewport().getLayout().setActiveItem( 1) ;
	},
	showLoginForm : function(){
		var me = this;
		me.getViewport().getLayout().setActiveItem( 0 ) ;
	}
});