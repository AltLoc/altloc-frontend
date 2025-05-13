// export class FetchError extends Error {
//   override name = "FetchError";

//   public readonly response: Response;

//   constructor(response: Response, options?: ErrorOptions) {
//     const message = response.statusText
//       ? `${response.status} ${response.statusText}   (${response.url}) `
//       : `${response.status} (${response.url})`;

//     super(message, options);
//     this.response = response;
//   }
// }

// export class FetchError extends Error {
//   override name = "FetchError";
//   public readonly response: Response;
//   public readonly status: number;
//   public readonly detail?: string;

//   constructor(response: Response, options?: ErrorOptions, detail?: string) {
//     const message = response.statusText
//       ? `${response.status} ${response.statusText} (${response.url})`
//       : `${response.status} (${response.url})`;

//     super(message, options);
//     this.response = response;
//     this.status = response.status;
//   }

//   static async fromResponse(response: Response) {
//     let detail;
//     try {
//       const json = await response.json();
//       detail = json?.detail || json?.message || undefined;
//     } catch {
//       detail = undefined;
//     }
//     const error = new FetchError(response, undefined, detail);
//     return error;
//   }
// }

export class FetchError extends Error {
  override name = "FetchError";

  public readonly response: Response;
  public readonly problemDetails?: {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    description?: string;
  };

  constructor(
    response: Response,
    problemDetails?: any,
    options?: ErrorOptions
  ) {
    const message =
      problemDetails?.detail ||
      response.statusText ||
      `HTTP error ${response.status}`;
    super(message.trim(), options);

    this.response = response;
    this.problemDetails = problemDetails;
  }
}

// export async function fetchWithErrorHandling(
//   input: RequestInfo,
//   init?: RequestInit
// ): Promise<Response> {
//   const response = await fetch(input, init);

//   if (!response.ok) {
//     let problemDetails;

//     try {
//       problemDetails = await response.json(); // пробуем парсить тело
//     } catch {
//       // тело не JSON — оставим пустым
//     }

//     throw new FetchError(response, problemDetails);
//   }

//   return response;
// }
