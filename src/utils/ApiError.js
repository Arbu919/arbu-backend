class ApiError extends Error {
    constructor(
        statusCode,
        message= "SomeThing wint wrong status",
        errors = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors
        this.statck = statck

        if (stack) {
            this.stack = statck
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }