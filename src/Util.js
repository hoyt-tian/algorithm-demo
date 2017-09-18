class Util{
    static addClass(classNameList, newClass){
        if(classNameList){

            if( new RegExp("\b"+newClass+"\b").test(classNameList) ){
                return classNameList;
            }
            return classNameList + " " + newClass;
        }
        return newClass;
    }

    static removeClass(classNameList, className){
        if(classNameList){
            const reg = className instanceof RegExp ? className : new RegExp("\b"+className+"\b");
            return classNameList.replace(reg, "");
        }
        return "";
    }

    static clone(obj){
        return JSON.parse(JSON.stringify(obj));
    }
}

export default Util;