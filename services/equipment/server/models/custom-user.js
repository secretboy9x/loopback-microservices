let config = require('../../server/config.json');
let path = require('path');
let app = require('../server');

module.exports = (CustomUser) => {
       // send an email
   // send verification email after registration
  CustomUser.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered');

    let verifyLink = `${app.get('protocol')}://${app.get('host')}${((app.get('port') === '3000') ? '' : (`:${app.get('port')}`))}${app.get('restApiRoot')}/custom-users/confirm?uid=${userInstance.id}`;
    let options = {
      type: 'email',
      to: userInstance.email,
      from: 'doidekji@gmail.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: CustomUser,
      verifyHref: verifyLink
    };

    userInstance.verify(options, function(err, response, next) {
      if (err) { return next(err); }

      context.res.render('responce', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
      console.log('--------------------');
      console.log('dd', context);
    });
  });
};
