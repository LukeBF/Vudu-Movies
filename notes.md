Service Files - a list of functions that the controllers are going to call

Model Files - the only files that know that a database exists

Cotrollers communicate with the model and the model communicates with the database and returns data

In the service files, user the syntax:
exports.getMovieListing = (req,res)=>{

}
This is because there will be multiple functions to export and module.export only allows you to export one thing