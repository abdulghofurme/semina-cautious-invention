export class WebResponse<T> {
  data?: T;
  message?: string;
  errors?: unknown;
}

export type TWebResponse = InstanceType<typeof WebResponse>;
