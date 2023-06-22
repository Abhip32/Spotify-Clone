export async function greet(){
    var today = new Date(),
    time = today.getHours();
    let message=""
    if(time <=12&&time>=0)
    {
      message = "Good Morning";

    }
    else if(time>=12&&time <=18)
    {
      message = "Good Afternoon";

    }
    else if(time >=18&&time <=20)
    {
      message = "Good Evening";

    }
    else{
      message = "Good Night";

    }
    return message;

}


