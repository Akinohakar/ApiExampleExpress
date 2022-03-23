module.exports=(error,req,res,next)=>{//el next lo envia aqui ya que no existe ninguna cosa que lo reciba 
    console.log(error);//el error completo
    console.log(error.name);//el puro codigo del error
    
    if(error.name==='CastError'){
        res.status(400).send({error:'el id esta mal,que tratas de hacer prro '});
    }else{
        res.status(500).end();
    }
}