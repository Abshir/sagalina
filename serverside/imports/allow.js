/**
 * Allowance Manager.
 *
 * @author Abdul Abshir and Thomas Rientjes
 * @version 0.4.6
 * MIT Licensed
 */
module.exports = {
    users : function(request, response, next) {
        var user = request.session.user;

        if (user) {
            next();
        } else {
            response.send(401);
        }
    },
    admin : function(request, response, next) {
        var user = request.session.user;

        if (user && user.username === 'admin') {
            next();
        } else {
            response.send(401);
        }
    },
    sameUserAndAdmin : function(request, response, next) {
        var user = request.session.user;

        if (user && (request.params.username === user.username || user.username === 'admin')) {
            next();
        } else {
            response.send(401, 'who are you?');
        }
    }
};
