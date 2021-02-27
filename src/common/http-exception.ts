class HttpException extends Error {
    statusCode: number;
    msg: string;
    error: Error | null;
    data: null;

    constructor(statusCode: number, msg: string, error?: Error) {
        super(msg);
        this.statusCode = statusCode;
        this.msg = msg;
        this.error = error || null;
        this.data = null;
    }
}

export default HttpException;
