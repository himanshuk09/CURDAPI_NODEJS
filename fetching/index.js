$(document).ready(()=>{
    const webServiceUrl="https://api.publicapis.org/entries";
    console.log("working");
    $.ajax({
        url:webServiceUrl,
        method:"GET",
        datatype:"JSON",
        async:true,
        success:(res)=>{
            console.log(res)
        },
        error:(error)=>{
            console.log(error);
        }
    });
    const url="http://localhost:8080/user/get"
    $.ajax({
        url:url,
        method:"GET",
        datatype:"JSON",
        async:true,
        crossDomain: true,
        success:(res)=>{
            console.log(res)
        },
        error:(error)=>{
            console.log(error);
        }
    });
    
    const urlid="http://localhost:8080/user/get/64ca4d5019543477c52fd52b"
    $.ajax({
        url:urlid,
        method:"GET",
        datatype:"JSON",
        async:true,
        crossDomain: true,
        success:(res)=>{
            console.log(res)
        },
        error:(error)=>{
            console.log(error);
        }
    });
    // const fetchFun=async function (res,req){
    //     try{
    //             const  data=await fetch(webServiceUrl)
    //             res.jsonp({
    //                 Message: "user Added successfully ",
    //                 status: data,
    //                 result: userData
    //             })
    //     }catch (e) {
    //         res.jsonp({
    //             Message: "unable to add user ",
    //             status: false,
    //             result: e
    //         })
    //     }
    // }
})

