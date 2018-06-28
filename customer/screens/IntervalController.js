class IntervalController {
    functions = [];
    functionInvoker = () => {
        this.functions.map(func => {
            func();
        });
    }

    start = () => {
        this.itv = setInterval(this.functionInvoker, 10000);
    }

    stop = () => {
        clearInterval(this.itv);
    }

    register = (func) => {
        if(!this.functions.find(f => f === func)){
            this.functions.push(func);
        }        
    }
}

var intervalController = new IntervalController;
export default intervalController;