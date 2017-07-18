module.exports = function (app) {

var fileTools = require('../imports/filetools'),
allow = require('../imports/allow');
path = '/service'; //route bijvoorbeeld localhost:4210/service/controllerpath

// DYNAMIC CONTROLLER IMPORTS
controllerPath = __dirname + '/../controllers';
controllers = fileTools.fetchNames(controllerPath, true);

controllers.forEach(function (file) {
    this[file] = require(controllerPath + '/' + file);
});

//CREATE:
app.post(path + '/item', item.create);
app.post(path + '/category', category.create);
app.post(path + '/subCategory', subCategory.create);
app.post(path + '/order', /*allow.sameUserAndAdmin, */order.create); //admin: niet iedereen moet de orders kunnen aanmaken en eventueel wijzigen (betalingen staan erin verwerkt).

//GET SHOW:
app.get(path + '/item/:_id', item.show);
app.get(path + '/category/:_id', category.show);
app.get(path + '/subCategory/:_id', subCategory.show);
app.get(path + '/order/:_id', /*allow.sameUserAndAdmin, */order.show);

//GET LIST
app.get(path + '/category', category.list);
app.get(path + '/subCategory', subCategory.list);
app.get(path + '/item', item.list);
app.get(path + '/order', /*allow.sameUserAndAdmin, */order.list);

//UPDATE
app.put(path + '/item/:_id', /*allow.admin,*/ item.update);
app.put(path + '/category/:_id', /*allow.admin, */category.update);
app.put(path + '/subCategory/:_id', /*allow.admin, */subCategory.update);
app.put(path + '/order/:_id', /*allow.sameUserAndAdmin,*/ order.update); 

//DELETE
app.delete(path + '/item/:_id', item.del);
app.delete(path + '/category/:_id', /*allow.admin,*/ category.del);
app.delete(path + '/subCategory/:_id', /*allow.admin,*/ subCategory.del);
app.delete(path + '/order/:_id', /*allow.admin, */order.del); 
};

/*    // ROUTES
    app.post(path + '/city', allow.admin, city.create);
    app.get(path + '/city', city.list);
    app.get(path + '/city/:_id', city.show);
    app.put(path + '/city/:_id', allow.admin, city.update);
    app.del(path + '/city/:_id', allow.admin, city.del);*/