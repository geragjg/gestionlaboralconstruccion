namespace GLCService.BusinessLogic.RequestsResponses
{
    public class OperationResult<T>
    {
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;

        public ErrorType ErrorType { get; set; }

        public bool Success { get; set; } = true;

    }

    public enum ErrorType
    {
        None,
        NotFound,
        InvalidInput,
        Unauthorized,
        InternalError,
        NoData
    }
}
