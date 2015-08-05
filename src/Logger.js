let Logger = {
    logLevel: 'info',

    info (){
        if(this.logLevel == 'info') {
            let args = [];
            for(let i=0; i<arguments.length; i++) {
                args.push(arguments[i]);
            }

            console.log('info:', ...args);
        }
    },

    createTabs (nbTabs) {
        var tabs = "";
        var spaces = "    ";
        for(var i=0; i<nbTabs; i++) {
            tabs += spaces;
        }
        return tabs;
    },

    setLevel(level){
        this.logLevel = level;
    }
};

export default Logger;