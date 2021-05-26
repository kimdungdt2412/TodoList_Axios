function Validation(){
    

    Validation.prototype.isEmpty = function(_tittle){
        var flag = true;
        if(_tittle === '')
        {
            getEle('notiInput').innerHTML = '(*) Task Empty!';
            getEle('notiInput').style.display = 'block';
            flag = false;
        }
        else
        {
            getEle('notiInput').innerHTML = '';
            getEle('notiInput').style.display = 'none';
        }

        return flag;

    };

    Validation.prototype.isNameSake = function(_tittle, arr){
       
        var check = true;
        for(var i = 0; i<arr.length ; i++)
        {
            if(_tittle.toLowerCase() === arr[i].textTodo.toLowerCase())
            {
                getEle('notiInput').innerHTML = '(*) Task is namesake!';
                getEle('notiInput').style.display = 'block';
                check = false;
                break;
                
            }
            else{
                getEle('notiInput').innerHTML = '';
                getEle('notiInput').style.display = 'none';
            }
        }
        return check;

    }
}