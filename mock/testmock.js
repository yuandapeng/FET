const arry={
    status:200,
    code:200,
    result:{

    }
}

const status={
    status:200
}

export default {
   
    "GET /api/GET":(req,res)=> {
        const {method}=req;
        res.json({
            ...status,
            result:{
                method
            }      
        })
      },
    "DELETE /api/DELETE": (req,res)=> {
        const {method}=req;
        res.json({
            ...status,
            result:{
                method
            }    
        })
      },
    "PUT /api/PUT": (req,res)=> {
        const {method}=req;
        res.json({
            ...status,
            result:{
                method
            }    
        })
      },
    "POST /api/POST": (req,res)=> {
        const {method}=req;
        res.json({
            ...status,
            result:{
                method
            }    
        })
      },
      "POST /api/login": (req,res)=> {
        const {method}=req;
        res.json({
            ...status,
            result:{
                login:true
            }    
        })
      },
}