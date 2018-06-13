// 截流 throttle 
// 防抖 debounce 在规定时间执行一次，后执行
// 都为解决高频事件而制定，scroll mousewheel mousemover 
// mousemove touchmove onresize

const utils = {
    // 帮忙method执行的次数在规定时间内还有一次
    // method执行时，函数内的this 一定要指向我们的PureFullPage 类
    throttle(method,context,delay) {
        // args是什么
        // return 返回的函数就是等下事件执行的真正函数体
        // 产生了闭包

        let wait = false;
        return function(...args) {
            // console.log(args)
            if(!wait) {
                method.apply(context,args)
                wait = true;
                setTimeout(()=> {
                    wait = false;
                },delay)
            }
            
        }
    },
    debounce(method,context,event,delay) {
        // window.resize 不要急，等一下再执行
        clearTimeout(context.tId);
        context.tId = setTimeout(()=>{
            method.call(context,event)
        },delay)
    },
    getWheelDelta(event) {
        // console.log(event)
        if(event.wheelDelta) {
            return event.wheelDelta;
        }
        // chrome
     
    }
}