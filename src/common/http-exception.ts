class HttpException extends Error {
    statusCode: number;
    message: string;
    error: Error | null;
    data: null;

    constructor(statusCode: number, message: string, error?: Error) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
        this.data = null;
    }
}

export default HttpException;
