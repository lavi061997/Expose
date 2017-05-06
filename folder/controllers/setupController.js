var results=require(".././functions/times");
module.exports=function(app){
  app.get("/",function(req,res){
    console.log(results.getData());
    res.send(results());
  });
};
