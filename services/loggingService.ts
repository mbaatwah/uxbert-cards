export enum LoggingLevel {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

export class Logger {

    private static _instance: Logger;

    private constructor(){}

    public static get Instance(): Logger | null{
        if(this._instance == null)
            this._instance = new this();
        return this._instance;
    }

    public log(level: LoggingLevel = LoggingLevels.HIGH, className: string, method: string, exception: string){
        console.log(`ERROR [${level.toString()}] - [${className}][${method}]`, exception);
        //TODO: post to some other monitoring service...
    }
}