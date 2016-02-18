/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

	hookTimeout: 600000,

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  authenticate  : {
  	google : {
  		clienteID : '38197721552-8qj3ledhsi0nkgacgmjhui1h4gl8bigs.apps.googleusercontent.com',
		  clienteSecret : 'wMunl7wFgiNgwdklJ3eZ66P9',
		  callbackURL : 'http://localhost:3000/oauth/google/callback'  		
  	}
  }
};
