class HttpException extends Error {
    statusCode: number;
    message: string;
    error: Error | null;

    constructor(statusCode: number, message: string, error?: Error) {
        super(message);

        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}

export default HttpException;
