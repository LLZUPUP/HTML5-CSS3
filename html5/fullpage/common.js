class PureFullPage {
    // options 是插件的配置
    constructor(options) {
        const defaultOptions = {
            isShowNav: true,
            delay: 1000,
            // 每次turnpage callback
            definePages: ()=> {}
        }
        this.currentPage = 0;
        this.currentPosition = 0;
        this.options = Object.assign(defaultOptions,options);
        console.log(this.options)
        this.viewHeight = window.innerHeight;
        this.pureFullPage = document.querySelector('#pureFullPage');
        this.page = document.querySelectorAll('.page');
        this.DELAY = this.options.delay;
        this.init();
    }
    init() {
        this.pureFullPage.style.height = `${this.viewHeight}px`;
        // mousewheel时间监听
        // this.scrollMouse 方法，负责滚动 执行太频繁
        // throttle 在规定时间里只执行一次
        // 重新返回一个函数，handleMouseWheel，闭包，将this.scrollMouse 封到内部 
        // this,函数执行的context
        // 1000 delay 推迟执行的时间
        const handleMouseWheel = utils.throttle(this.scrollMouse,this,this.DELAY);
        if(navigator.userAgent.toLowerCase().indexOf('firefox')===-1) {
            document.addEventListener('mousewheel',handleMouseWheel,false);
        }else {
            document.addEventListener('DOMMouseScroll',handleMouseWheel,false);
        }

        // 事件处理函数交给对象的方法来执行，
        window.addEventListener('resize',this.handleWindowResize.bind(this),false);
    }
    handleWindowResize(e) {
        
        // 防抖， 
        utils.debounce(this.getNewPosition,this,event,this.DELAY);
    }
    getNewPosition() {
        this.viewHeight = window.innerHeight;
        this.pureFullPage.style.height = `${this.viewHeight}px`;
        this.pureFullPage.style.top = `-${this.currentPage*this.viewHeight}px`;
    }
    // 滚轮事件处理函数
    scrollMouse(e) {
        // this.handleWindowResize();
        const delta = utils.getWheelDelta(event);
        if(delta>0) {
            this.goUp();
        }else {
            this.goDown();
        }
    }
    goUp() {
        if(this.currentPage==0) {
            return
        }
        this.currentPage--;
        this.pureFullPage.style.top = `-${this.currentPage*this.viewHeight}px`;
        
    }
    goDown() {
        if(this.currentPage==3) {
            return
        }
        this.currentPage++;
        this.pureFullPage.style.top = `-${this.currentPage*this.viewHeight}px`;
    }
}
