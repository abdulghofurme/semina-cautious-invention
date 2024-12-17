import { z, ZodType } from 'zod';

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z
      .string()
      .min(3, 'Panjang nama kategori minimal 3 karakter')
      .max(20, 'Panjang nama kategori maksimal 20 karakter'),
  });
}

export type TCategoryRequestPayload = z.infer<typeof CategoryValidation.CREATE>;
