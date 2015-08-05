import winston from 'winston';

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

let Logger = {
    info (message){
        logger.info(message ? message : '');
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
        logger.transports.console.level = level;
    }
};

export default Logger;